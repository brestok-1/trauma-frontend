const ChatCard = () => {
  return (
    <div className="bg-light_gray border border-border_color rounded-3xl w-1/4 p-4">
      <p className="text-header_color font-bold text-start text-xl">
        Trauma Clinic XYZ
      </p>
      <p className="text-[16px] text-start font-normal text-header_color">Psychotherapy Clinic, <br/> Haarlem</p>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <span className="tags-style bg-dark_gray">
            12-18 jaar
          </span>
          <span className="tags-style bg-pale_orange">
            Eetstornis
          </span>
        </div>
        <div className="flex flex-wrap gap-4">
          <span className="tags-style bg-pastel_blue">
            Beeldende Therapie
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
