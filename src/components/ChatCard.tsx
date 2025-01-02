const ChatCard = () => {
  return (
    <div className="bg-light_gray border border-border_color rounded-3xl w-fit lg:p-4 px-2 py-4">
      <p className="text-header_color font-bold text-start lg:text-xl text-lg mb-2">
        Trauma Clinic XYZ
      </p>
      <p className="lg:text-[16px] text-xs text-start font-normal text-header_color mb-2">Psychotherapy Clinic, <br/> Haarlem</p>
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
