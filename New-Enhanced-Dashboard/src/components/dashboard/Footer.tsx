export function Footer() {
  return (
    <footer className="border-t border-[#E5E7E8] mt-8">
      <div className="py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-[#7B878C]">
            © 2025 - PulseFlow Inc.
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              className="text-sm text-[#7B878C] hover:text-[#191B1C] transition-colors"
            >
              Documentation
            </a>
            <a 
              href="#" 
              className="text-sm text-[#7B878C] hover:text-[#191B1C] transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-[#7B878C] hover:text-[#191B1C] transition-colors"
            >
              FAQs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}