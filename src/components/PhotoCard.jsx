
function PhotoCard(props) {
  const photo = props.photo;
  const isFavourite = props.isFavourite;
  const onToggleFavourite = props.onToggleFavourite;

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <img
        src={photo.download_url}
        alt={photo.author}
        className="h-56 w-full object-cover"
      />

      <div className="flex items-center justify-between p-3">
        <p className="font-medium">{photo.author}</p>

        <button
          type="button"
          onClick={onToggleFavourite}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className="text-2xl"
        >
          {isFavourite ? '♥' : '♡'}
        </button>
      </div>
    </div>
  );
}

export default PhotoCard;
