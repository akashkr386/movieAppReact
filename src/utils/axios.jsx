import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2ExOTIzYzg3YTkzOWJhZWU0ZTg5ZTYxM2E4NGUyZSIsIm5iZiI6MTczMjYxNjc5Ni43MTYyMzg3LCJzdWIiOiI2NzQ1OWI5ZTQ2MjYwZTE0ZmJlYjZhYjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.V2BCQknuuf-b_1QkHILSK-iuYY4De7G1IXd4NTI8ujM",
  },
});

export default instance;
