  const city = "jakarta";
  const street = "Jl. Kebon Jeruk";

export const getUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    return users.map((user) => ({
      name: user.name,
      email: user.email,
        city: city,
        street: street,
    }));
  } catch (error) {
    console.error("[Services] Gagal mengambil data:", error.message);
    throw error;
  }
};