const handleAddImages = useCallback(async (query, nextPage = null) => {
  setLoading(true);

  try {
    const fetchedImages = await fetchImages(query, nextPage || currentPage);
    const newImages = nextPage ? [...images, ...fetchedImages] : fetchedImages;

    setImages(newImages);
    setCurrentPage(nextPage ? nextPage : 1);
    setQuery(query);
  } catch (err) {
    console.error('Error fetching images:', err);
  } finally {
    setLoading(false);
  }
}, []);

// const handleAddImages = async (query, nextPage = null) => {
//   setLoading(true);

//   try {
//     const fetchedImages = await fetchImages(query, nextPage || currentPage);
//     const newImages = nextPage
//       ? [...images, ...fetchedImages]
//       : fetchedImages;

//     setImages(newImages);
//     setCurrentPage(nextPage ? nextPage : 1);
//     setQuery(query);
//   } catch (err) {
//     console.error('Error fetching images:', err);
//   } finally {
//     setLoading(false);
//   }
// };
