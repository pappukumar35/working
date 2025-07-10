export default function Footer() {
  return (
    <footer className="bg-indigo-700 text-white text-center py-6 mt-12">
      <p className="text-sm">
        © {new Date().getFullYear()} CrowdfundIt — Built with 💙 by Durgesh Kumar
      </p>
      <div className="mt-2">
        <a href="/about" className="text-indigo-200 hover:underline px-2">About</a>
        <a href="/contact" className="text-indigo-200 hover:underline px-2">Contact</a>
        <a href="/terms" className="text-indigo-200 hover:underline px-2">Terms</a>
      </div>
    </footer>
  );
}
