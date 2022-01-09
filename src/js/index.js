import '../style/style.scss';

const data = [
    { eventName: 'Soccer toernament', type: 'Sport event', Address: 'Radioweg 76, 1012 Dj Amsterdam Google maps', date: '22/01/22', position: {lat: -25.363, lng: 131.044} },
    { eventName: 'Soccer toernament', type: 'Sport event', Address: 'Radioweg 76, 1012 Dj Amsterdam Google maps', date: '22/01/22', position: {lat: -25.363, lng: 132.044}},
    { eventName: 'Soccer toernament', type: 'Sport event', Address: 'Radioweg 76, 1012 Dj Amsterdam Google maps', date: '22/01/22', position: {lat: -25.363, lng: 133.044}},
    { eventName: 'Soccer toernament', type: 'Sport event', Address: 'Radioweg 76, 1012 Dj Amsterdam Google maps', date: '22/01/22', position: {lat: -25.363, lng: 134.044}},
];

function createMarker(count){
    if(!count) return
    return [
        '<svg width="63" height="61" viewBox="0 0 63 61" fill="none" xmlns="http://www.w3.org/2000/svg">',
        '<circle cx="35" cy="33" r="28" fill="#FFDF5C"/>',
        '<path d="M37.7293 34.5C37.7293 35.2177 37.1506 35.7918 36.4272 35.7918C35.7244 35.7918 35.1457 35.2382 35.125 34.541C35.125 34.5205 35.125 34.5205 35.125 34.5V28H29.8543V34.4795C29.8543 34.5 29.8543 34.5 29.8543 34.5205C29.8543 35.2177 29.2756 35.7918 28.5728 35.7918C27.8494 35.7918 27.2707 35.2177 27.2707 34.5V28H22V34.4795C22 38.0678 24.935 41 28.5728 41C30.0404 41 31.4045 40.5079 32.5 39.7082C33.5955 40.5284 34.9596 41 36.4272 41C40.0443 41 43 38.0883 43 34.4795V28H37.7293V34.5Z" fill="#0A2328"/>',
        '<path d="M46.5 36C45.122 36 44 37.122 44 38.5C44 39.878 45.122 41 46.5 41C47.878 41 49 39.878 49 38.5C49 37.1024 47.8976 36 46.5 36Z" fill="#0A2328"/>',
        '<path d="M49 26.5049C49 25.1243 47.878 24 46.5 24C45.122 24 44 25.1243 44 26.5049V31.4951C44 32.8757 45.122 34 46.5 34C47.878 34 49 32.8757 49 31.4951V26.5049Z" fill="#0A2328"/>',
        '<circle cx="11" cy="14" r="11" fill="black"/>',
        `<text xml:space="preserve" font-family="Noto Sans JP" font-size="11" id="svg_2" y="18" x="${count > 9 ? 5 : 8 }" stroke-width="0" fill="#fff">${count}</text>`,
        '</svg>'
    ].join('\n');
}

function addingMarkersOnMap(data){
    data.forEach((place, i)=>{
        new google.maps.Marker({
            position: place.position,
            map,
            icon: { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(createMarker(i+1))},
            // title: "Hello World!",
        });
    })
}

let map;
function initMap(){
    const myLatLng = { lat: -25.363, lng: 131.044 };

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        disableDefaultUI: true,
        zoom: 8
    });

    addingMarkersOnMap(data)
}
window.initMap = initMap;
