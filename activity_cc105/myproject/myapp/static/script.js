document.addEventListener("DOMContentLoaded", () => {
    const dataset = [
        {
            title: "Digital Media Planner",
            experience: "5 - 10 yrs",
            skills: "Media Planning, Digital Media",
            location: "Mumbai",
            industry: "Advertising",
            salary: "3855"
        },
        {
            title: "Online Bidding Executive",
            experience: "2 - 5 yrs",
            skills: "Pre-sales, Client Negotiation",
            location: "Pune",
            industry: "IT-Software",
            salary: "2639"
        },
        // Add more dataset entries as needed
    ];

    const tableBody = document.querySelector("#jobTable tbody");
    const searchBar = document.querySelector("#searchBar");
    const locationFilter = document.querySelector("#locationFilter");
    const experienceFilter = document.querySelector("#experienceFilter");
    const prevPage = document.querySelector("#prevPage");
    const nextPage = document.querySelector("#nextPage");
    const pageInfo = document.querySelector("#pageInfo");
    const resetFilters = document.querySelector("#resetFilters");

    let currentPage = 1;
    const rowsPerPage = 5;

    function renderTable(data) {
        tableBody.innerHTML = "";
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = data.slice(start, end);

        paginatedData.forEach(job => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${job.title}</td>
                <td>${job.experience}</td>
                <td>${job.skills}</td>
                <td>${job.location}</td>
                <td>${job.salary}</td>
            `;
            tableBody.appendChild(row);
        });

        pageInfo.textContent = `Page ${currentPage}`;
        prevPage.disabled = currentPage === 1;
        nextPage.disabled = end >= data.length;
    }

    function filterData() {
        const searchQuery = searchBar.value.toLowerCase();
        const location = locationFilter.value;
        const experience = experienceFilter.value;

        return dataset.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchQuery);
            const matchesLocation = !location || job.location === location;
            const matchesExperience = !experience || job.experience.includes(experience);
            return matchesSearch && matchesLocation && matchesExperience;
        });
    }

    searchBar.addEventListener("input", () => {
        currentPage = 1;
        renderTable(filterData());
    });

    locationFilter.addEventListener("change", () => {
        currentPage = 1;
        renderTable(filterData());
    });

    experienceFilter.addEventListener("change", () => {
        currentPage = 1;
        renderTable(filterData());
    });

    prevPage.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable(filterData());
        }
    });

    nextPage.addEventListener("click", () => {
        if (currentPage * rowsPerPage < filterData().length) {
            currentPage++;
            renderTable(filterData());
        }
    });

    resetFilters.addEventListener("click", () => {
        searchBar.value = "";
        locationFilter.value = "";
        experienceFilter.value = "";
        currentPage = 1;
        renderTable(dataset);
    });

    renderTable(dataset);
});
