import "./Footer.scss";

export default function Footer() {
  return (
    <footer>
      <div className="h-[112px] mb-6 flex flex-row">
        <div className="mr-6 w-[293.8px]">
          <h4 className="mb-3">About</h4>
          <p className="text-blur text-sm mb-2">About Us</p>
          <p className="text-blur text-sm mb-2">Careers</p>
          <p className="text-blur text-sm">Blog</p>
        </div>
        <div className="mr-6 w-[293.8px]">
          <h4 className="mb-3">Products</h4>
          <p className="text-blur text-sm mb-2">Spot Trading</p>
          <p className="text-blur text-sm mb-2">Margin Trading</p>
          <p className="text-blur text-sm">P2P Trading</p>
        </div>
        <div className="mr-6 w-[293.8px]">
          <h4 className="mb-3">Support</h4>
          <p className="text-blur text-sm mb-2">Help Center</p>
          <p className="text-blur text-sm mb-2">Contact Us</p>
          <p className="text-blur text-sm">API Docs</p>
        </div>
        <div className="w-[293.8px]">
          <h4 className="mb-3">Legal</h4>
          <p className="text-blur text-sm mb-2">Terms of Service</p>
          <p className="text-blur text-sm mb-2">Privacy Policy</p>
          <p className="text-blur text-sm">Risk Disclosure</p>
        </div>
      </div>
      <div className="pt-6">
        <p className="text-center text-blur text-sm">© 2026 Test.</p>
      </div>
    </footer>
  );
}
