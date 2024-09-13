export async function fetchProducts(productsLink) {
  const promise = await fetch(productsLink);
  const productsData = await promise.json();
  return productsData.map(product => product);
}
