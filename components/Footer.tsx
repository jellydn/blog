function Footer() {
    return (
        <footer className="bg-white">
            <div className="container py-4 px-6 mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-gray-600">
                            © ProductsWay 2020-{new Date().getFullYear()}.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
