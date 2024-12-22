const ChatDescription = () => {
  const data = {
    tags: [
      'Eetstornis',
      'Autisme Spectrum Stoornis',
      'Verslaving',
      'Beeldende Therapie',
      'CGT',
      'EMDR',
    ],
    ages: ['0-6 jaar', '6-12 jaar', '12-18 jaar', '18-23 jaar'],
  };

  return (
    <div className="bg-light_gray rounded-t-3xl border border-border_color pt-5">
      <p className="font-bold text-[32px] px-4 text-header_color text-start">
        Trauma Clinic XYZ
      </p>
      <div className="flex flex-col gap-4 rounded-lg p-4">
        <div className="flex flex-wrap gap-4">
          {data.tags.map((tag, index) => (
            <span
              key={index}
              className={`tags-style ${
                tag.includes('Therapie') || tag === 'CGT' || tag === 'EMDR'
                  ? 'bg-pastel_blue'
                  : 'bg-pale_orange'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {data.ages.map((age, index) => (
            <span
              key={index}
              className="tags-style bg-dark_gray"
            >
              {age}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-white pt-4 pl-4 pr-2 rounded-t-3xl border-t text-start border-border_color flex flex-col">
        <p className="font-bold text-xl text-header_color mb-2">Description</p>
        <p className="text-[#555555] text-[16px] font-normal mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          iaculis mi fringilla mauris <br /> ornare, in accumsan enim volutpat.
          Morbi vulputate libero rutrum neque dapibus suscipit. <br /> In
          vehicula, magna vitae ornare aliquam, nulla quam suscipit lectus, non
          consectetur ligula <br /> enim at sem. Maecenas sit amet nisl non
          tortor lacinia lobortis a at risus.
        </p>
        <button className="bg-[#0155A6] text-white text-[16px] font-medium p-3 mt-auto mb-2 self-end">
          Lees meer
        </button>
      </div>
    </div>
  );
};

export default ChatDescription;
