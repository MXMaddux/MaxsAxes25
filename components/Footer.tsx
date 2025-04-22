const Footer = () => {
  return (
    <footer className="h-20 flex  justify-center items-center bg-black text-center gap-4">
      <h5 className="text-blue-50 m-[.1rem] font-normal transform-none leading-5">
        &copy; {new Date().getFullYear()}
      </h5>
      <span className="text-blue-400">Max's Axes</span>
      <h5 className="text-blue-50 m-[.1rem] font-normal transform-none leading-5">
        All rights reserved
      </h5>
    </footer>
  );
};
export default Footer;
