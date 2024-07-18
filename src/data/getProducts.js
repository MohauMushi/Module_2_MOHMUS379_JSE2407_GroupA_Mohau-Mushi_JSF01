export const fetchSingleProduct = async () => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products`);
    if (!response.ok) {
      throw new Error(
        "Data fetching failed :( , please check your network connection and reload."
      );
    }
    const data = await response.json();
    return { response: data };
  } catch (error) {
    return { error: error };
  }
};
