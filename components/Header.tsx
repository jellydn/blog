import Link from 'next/link';
import { useFlags } from 'flags/client';

export default function Header({ siteTitle }: { siteTitle: string }) {
    const { flags } = useFlags();

    return (
        <div className="mb-2 shadow-lg navbar bg-neutral text-neutral-content">
            <Link href="/" legacyBehavior>
                <div className="flex-1 px-2 mx-2">
                    <svg
                        className="w-6 h-6 sm:h-6 sm:w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <span className="ml-2 text-lg font-bold">{siteTitle}</span>
                </div>
            </Link>
            <div className="flex-none px-2 mx-2">
                <div className="items-stretch hidden lg:flex">
                    <Link href="/" legacyBehavior>
                        <button
                            type="button"
                            className="btn btn-ghost btn-sm rounded-btn"
                        >
                            Home
                        </button>
                    </Link>
                    <a
                        target="_blank"
                        href="/resume.pdf"
                        className="btn btn-ghost btn-sm rounded-btn"
                    >
                        Resume
                    </a>
                    <a
                        target="_blank"
                        href="https://blog.productsway.com/"
                        className="btn btn-ghost btn-sm rounded-btn" rel="noreferrer"
                    >
                        Blog
                    </a>
                    <a
                        target="_blank"
                        href="https://www.youtube.com/c/ITManVietnam"
                        className="btn btn-ghost btn-sm rounded-btn"
                        rel="noreferrer"
                    >
                        YouTube Channel
                    </a>
                    {flags?.it_man_shop && (
                        <a
                            target="_blank"
                            href="https://bit.ly/m/itman"
                            className="btn btn-ghost btn-sm rounded-btn"
                            rel="noreferrer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            ITMan Shop
                        </a>
                    )}
                    <a
                        target="_blank"
                        href="https://www.polywork.com/dunghd"
                        className="btn btn-ghost btn-sm rounded-btn"
                        rel="noreferrer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </a>
                </div>
            </div>
            <div className="flex-none">
                <a
                    target="_blank"
                    href="https://github.com/jellydn"
                    className="btn btn-square btn-ghost"
                    rel="noreferrer"
                >
                    <svg
                        className="w-5 h-5 fill-current sm:h-6 sm:w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z" />
                    </svg>
                </a>
            </div>
        </div>
    );
}
