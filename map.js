document.addEventListener('DOMContentLoaded', function() {
    // Coordenadas do Distrito Federal
    const dfCoords = [-15.7942, -47.8825];

    // Inicializar o mapa
    const map = L.map('map').setView(dfCoords, 10);

    // Adicionar camada base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Simulação de dados das bacias hidrográficas do DF
    const bacias = [
        {
            nome: "Paranoá",
            coords: [[-15.85, -47.85], [-15.75, -47.75], [-15.8, -47.9]],
            alertas: 12,
            cor: "#e74c3c"
        },
        {
            nome: "São Bartolomeu",
            coords: [[-15.65, -47.6], [-15.7, -47.7], [-15.6, -47.8]],
            alertas: 8,
            cor: "#f39c12"
        },
        {
            nome: "Descoberto",
            coords: [[-15.8, -48.1], [-15.9, -48.0], [-15.85, -48.2]],
            alertas: 5,
            cor: "#27ae60"
        }
    ];

    // Adicionar polígonos das bacias
    bacias.forEach(bacia => {
        const polygon = L.polygon(bacia.coords, {
            color: bacia.cor,
            fillOpacity: 0.2,
            weight: 2
        }).addTo(map);

        polygon.bindPopup(`
            <b>Bacia ${bacia.nome}</b><br>
            <span class="badge bg-${bacia.cor === '#e74c3c' ? 'danger' : bacia.cor === '#f39c12' ? 'warning' : 'success'}">
                ${bacia.alertas} alertas
            </span>
        `);
    });

    // Simulação de pontos de monitoramento
    const pontos = [
        { nome: "Lago Paranoá", coords: [-15.8333, -47.8333], tipo: "água", status: "crítico" },
        { nome: "Córrego do Urubu", coords: [-15.7, -47.65], tipo: "água", status: "moderado" },
        { nome: "Represa Descoberto", coords: [-15.7833, -48.1333], tipo: "água", status: "normal" },
        { nome: "APA Cafuringa", coords: [-15.6, -47.8], tipo: "vegetação", status: "crítico" },
        { nome: "Parque Nacional", coords: [-15.65, -47.55], tipo: "vegetação", status: "moderado" }
    ];

    // Adicionar marcadores
    pontos.forEach(ponto => {
        let iconColor;
        let iconText;

        if (ponto.status === "crítico") {
            iconColor = "#e74c3c";
            iconText = "!";
        } else if (ponto.status === "moderado") {
            iconColor = "#f39c12";
            iconText = "!";
        } else {
            iconColor = "#27ae60";
            iconText = "✓";
        }

        const icon = L.divIcon({
            className: 'custom-icon',
            html: iconText,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15],
            style: `
                background-color: ${iconColor};
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                border: 2px solid white;
                box-shadow: 0 0 5px rgba(0,0,0,0.3);
            `
        });

        const marker = L.marker(ponto.coords, { icon: icon }).addTo(map);

        marker.bindPopup(`
            <b>${ponto.nome}</b><br>
            Tipo: ${ponto.tipo === "água" ? "Qualidade da água" : "Vegetação"}<br>
            Status: <span class="badge bg-${ponto.status === "crítico" ? "danger" : ponto.status === "moderado" ? "warning" : "success"}">
                ${ponto.status === "crítico" ? "Crítico" : ponto.status === "moderado" ? "Moderado" : "Normal"}
            </span>
        `);
    });

    // Adicionar controle de camadas
    const baseLayers = {
        "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),
        "Satélite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        })
    };

    L.control.layers(baseLayers).addTo(map);
});