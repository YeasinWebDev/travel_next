function HeaderSection({title, description}: {title: string, description: string}) {
  return (
    <header className="text-center mb-10 flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg leading-tight">{title}</h1>

      <p className="text-base sm:text-lg md:text-xl max-w-xl md:max-w-2xl mb-6 drop-shadow-md">
        {description}
      </p>
    </header>
  );
}

export default HeaderSection;
