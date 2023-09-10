function Sticker({
  sticker,
  size,
  selectHandler,
  isSelected,
}: {
  sticker: { id: number; src: string };
  size: number;
  selectHandler: () => void;
  isSelected: boolean;
}) {
  return (
    <button
      style={{
        width: size,
        height: size,
      }}
      onClick={selectHandler}
      type="button"
      className={`sticker-list__sticker`}
    >
      {isSelected && <div className="sticker-list__sticker--select" />}
      <img className="sticker-list__sticker-img" src={sticker.src} />
    </button>
  );
}

export default Sticker;
