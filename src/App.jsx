
import { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import useFetchPhotos from './hooks/useFetchPhotos';
import PhotoCard from './components/PhotoCard';
import favouritesReducer from './reducers/favouritesReducer';

function App() {
  const { photos, loading, error } = useFetchPhotos();

  const [search, setSearch] = useState('');
  const [favourites, dispatch] = useReducer(favouritesReducer, []);
  const [favouritesLoaded, setFavouritesLoaded] = useState(false);

  useEffect(function () {
    try {
      const savedFavourites = localStorage.getItem('favourites');

      if (savedFavourites) {
        const parsedFavourites = JSON.parse(savedFavourites);

        if (
          Array.isArray(parsedFavourites) &&
          parsedFavourites.every(function (id) {
            return typeof id === 'string';
          })
        ) {
          dispatch({
            type: 'LOAD_FAVOURITES',
            photoIds: [...new Set(parsedFavourites)]
          });
        }
      }
    } catch (error) {
      localStorage.removeItem('favourites');
    }

    setFavouritesLoaded(true);
  }, []);

  useEffect(function () {
    if (favouritesLoaded) {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  }, [favourites, favouritesLoaded]);

  const handleSearchChange = useCallback(function (event) {
    setSearch(event.target.value);
  }, []);

  const filteredPhotos = useMemo(function () {
    return photos.filter(function (photo) {
      return photo.author.toLowerCase().includes(search.toLowerCase());
    });
  }, [photos, search]);

  if (loading) {
    return <h2 className="p-6 text-xl">Loading photos...</h2>;
  }

  if (error) {
    return <h2 className="p-6 text-red-600">{error}</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Celebrare Photo Gallery
      </h1>

      <input
        type="text"
        placeholder="Search by author name..."
        value={search}
        onChange={handleSearchChange}
        className="mb-6 w-full rounded-lg border border-gray-300 bg-white p-3"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredPhotos.map(function (photo) {
          return (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={function () {
                dispatch({
                  type: 'TOGGLE_FAVOURITE',
                  photoId: photo.id
                });
              }}
            />
          );
        })}
      </div>

      {filteredPhotos.length === 0 && (
        <p className="mt-6 text-gray-600">No photos found.</p>
      )}
    </div>
  );
}

export default App;
