const CURRENT_YEAR = new Date().getFullYear();

function Footer() {
    return (
        <footer className="bg-white max-h-[100px]">
            <div className="container py-2 px-6 mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-gray-600 text-sm">
                            © ProductsWay 2020-{CURRENT_YEAR}.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
