import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="w-full mt-20 px-4 md:px-10 lg:px-20">
      {/* Unique Gradient Box - Compact & Vibrant */}
      <div className="bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400 rounded-t-[30px] shadow-2xl shadow-green-200/50">
        <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="bg-white p-2 rounded-xl shadow-sm">
              <img className="w-24" src={assets.logo} alt="logo" />
            </div>
            <p className="text-emerald-950 font-stretch-50% text-md text-left ">
              Trusted by thousands, we aim to make your shopping experience
              simple and affordable.
            </p>
          </div>

          {/* Links - Side by Side */}
          <div className="flex gap-10 md:gap-16 lg:gap-24">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="text-emerald-900 font-bold text-xs uppercase tracking-tighter mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-1.5">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        className="text-emerald-900/80 hover:text-white transition-all text-[13px] font-medium"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal Copyright Bar */}
        <div className="bg-emerald-900/10 py-4 px-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-emerald-950 font-bold uppercase tracking-widest border-t border-white/20">
          <p>
            {" "}
            {new Date().getFullYear()} ©GroceryCart || Developed by Monjurul
            Islam
          </p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:underline">Privacy</span>
            <span className="cursor-pointer hover:underline">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
