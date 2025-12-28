const db = require('../config/database');

exports.analyze = async (req, res) => {
    try {
        const { city_ids } = req.body; // User kirim: [1, 2, 3]

        if (!city_ids || city_ids.length < 2) {
            return res.status(400).json({ msg: "Minimal pilih 2 kota untuk dibandingkan!" });
        }

        // 1. AMBIL DATA DARI DB
        // Ambil data Kriteria
        const [criteria] = await db.query("SELECT * FROM criteria");
        
        // Ambil data Kota yang dipilih
        const placeholders = city_ids.map(() => '?').join(',');
        const [cities] = await db.query(`SELECT * FROM cities WHERE id IN (${placeholders})`, city_ids);

        // Ambil Nilai (Scores)
        const [scores] = await db.query(`
            SELECT city_id, criteria_id, value 
            FROM scores 
            WHERE city_id IN (${placeholders})
        `, city_ids);

        // 2. SUSUN STRUKTUR DATA (Mapping)
        // Agar mudah diakses: dataMap[cityId][criteriaId] = value
        let dataMap = {};
        cities.forEach(c => {
            dataMap[c.id] = {};
            // Isi default 0
            criteria.forEach(crit => dataMap[c.id][crit.id] = 0);
        });

        scores.forEach(s => {
            if (dataMap[s.city_id]) {
                dataMap[s.city_id][s.criteria_id] = s.value;
            }
        });

        // 3. PERHITUNGAN PROMETHEE
        let n = cities.length;
        let leavingFlow = {};  // Phi+
        let enteringFlow = {}; // Phi-
        let netFlow = {};      // Phi

        // Init Flow = 0
        cities.forEach(c => {
            leavingFlow[c.id] = 0;
            enteringFlow[c.id] = 0;
        });

        // Loop Perbandingan Berpasangan (Pairwise Comparison)
        // Bandingkan Kota A vs Kota B
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i === j) continue; // Jangan bandingkan diri sendiri

                let idA = cities[i].id;
                let idB = cities[j].id;
                let preferenceIndex = 0;
                let totalWeight = 0;

                // Cek setiap kriteria
                for (let k = 0; k < criteria.length; k++) {
                    let crit = criteria[k];
                    let valA = parseFloat(dataMap[idA][crit.id]);
                    let valB = parseFloat(dataMap[idB][crit.id]);
                    let weight = parseFloat(crit.weight);

                    let diff = valA - valB;

                    // Jika Cost, logikanya dibalik (Makin kecil makin bagus)
                    if (crit.type === 'cost') {
                        diff = valB - valA;
                    }

                    // Fungsi Preferensi Sederhana (0 atau 1)
                    let P = (diff > 0) ? 1 : 0;
                    
                    preferenceIndex += P * weight;
                    totalWeight += weight; // Asumsi total bobot belum tentu 1
                }
                
                // Normalisasi jika total bobot != 1 (Opsional, tapi bagus)
                // preferenceIndex = preferenceIndex / totalWeight; 

                // Akumulasi Flow
                leavingFlow[idA] += preferenceIndex;
                enteringFlow[idB] += preferenceIndex;
            }
        }

        // 4. HITUNG NET FLOW
        let results = cities.map(city => {
            let lf = leavingFlow[city.id] / (n - 1);
            let ef = enteringFlow[city.id] / (n - 1);
            let nf = lf - ef;

            return {
                city_id: city.id,
                city_name: city.name,
                image_url: city.image_url,
                leaving_flow: lf,
                entering_flow: ef,
                net_flow: nf
            };
        });

        // 5. SORTING (Ranking Tertinggi ke Terendah)
        results.sort((a, b) => b.net_flow - a.net_flow);

        // Tambah properti Ranking
        results = results.map((item, index) => ({ ...item, rank: index + 1 }));

        res.json({
            status: 'success',
            data: results
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};