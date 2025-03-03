const API_ROUTES = {
    stats: "/api/stats",
    albums: "/api/albums",
    createAlbum: "/api/createAlbum"
};

function fetchData(route, callback, method = "GET", data = null) {
    $.ajax({
        url: route,
        method,
        data: data ? JSON.stringify(data) : null,
        contentType: "application/json",
        success: response => callback(response),
        error: err => console.error(`Error fetching ${route}:`, err)
    });
}

// Fetch and update statistics
fetchData(API_ROUTES.stats, (response) => {
    console.log(response);
    
    $("#photoCount").text(response.photos || 0);
    $("#videoCount").text(response.videos || 0);
    $("#totalCount").text((response.photos || 0) + (response.videos || 0));

    new Chart($("#immichChart")[0].getContext("2d"), {
        type: "pie",
        data: {
            labels: ["Photos", "Videos"],
            datasets: [{
                data: [response.photos || 0, response.videos || 0],
                backgroundColor: ["#36A2EB", "#FF6384"]
            }]
        }
    });
});

// Fetch and update album list
fetchData(API_ROUTES.albums, (albums) => {
    console.log("Albums:", albums);
    const albumTableBody = $("#albumTable tbody");

    if (albums.length === 0) {
        albumTableBody.append("<tr><td colspan='3'>No albums found</td></tr>");
    } else {
        albums.forEach(album => {
            albumTableBody.append(`
                <tr>
                    <td>${album.albumName}</td>
                    <td>${album.assetCount}</td>
                    <td>${album.owner ? album.owner.name : "Unknown"}</td>
                </tr>
            `);
        });
    }
});

//Create Album Event
// Create album event
$("#createAlbumForm").submit(event => {
    event.preventDefault();
    
    const albumName = $("#albumName").val();
    const userId = $("#userId").val();
    const assetIds = $("#assetIds").val().split(",").map(id => id.trim());

    const newAlbum = {
        albumName,
        albumUsers: [{ role: "editor", userId }],
        assetIds,
        description: $("#description").val()
    };

    fetchData(API_ROUTES.createAlbum, response => {
        alert(`Album "${response.albumName}" created successfully!`);
        location.reload();
    }, "POST", newAlbum);
});