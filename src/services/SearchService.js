class SearchService {
  constructor() {
    this.searchAPI = "https://api.radar.io/v1/search/autocomplete?query=";
    this.query = "";
    this.rawSearchData = null;
    this.searchData = [];
  }

  setQuery(query) {
    this.query = query;
  }

  async fetchSearchApi() {
    try {
      const response = await fetch(`${this.searchAPI}${this.query}&limit=5`, {
        headers: {
          Authorization: "prj_live_pk_aae8a0517322f07cde7722d6881b47a748363824",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      this.rawSearchData = data;
      this.formatSearchData();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  formatSearchData() {
    this.rawSearchData["addresses"].map((address) => {
      const location = {
        lat: address["latitude"],
        long: address["longitude"],
        address: address["formattedAddress"],
      };

      this.searchData.push(location);
    });
  }
}

export default SearchService;
