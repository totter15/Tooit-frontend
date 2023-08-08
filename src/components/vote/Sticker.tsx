function Sticker({
  sticker,
  size,
  voteHandler,
  isSelected,
}: {
  sticker: { id: number; src: string };
  size: number;
  voteHandler: () => void;
  isSelected: boolean;
}) {
  return (
    <button
      style={{
        width: size,
        height: size,
      }}
      onClick={voteHandler}
      type="button"
      className={`sticker-list__sticker`}
    >
      {isSelected && <div className="sticker-list__sticker--select" />}
      <img className="sticker-list__sticker-img" src={sticker.src} />
    </button>
  );
}

export default Sticker;
