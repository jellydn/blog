import { Button } from 'components/Button';
import { RepoStars } from 'components/RepoStars';
import type { Repo } from 'lib/repos';

type ProjectsSectionProps = {
    projects: Repo[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
    return (
        <section className="py-20 bg-base-200/50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">
                            Featured Projects
                        </h2>
                        <p className="text-xl text-base-content/70">
                            Open source projects and tools I&apos;ve created
                        </p>
                    </div>
                    <Button
                        href="https://github.com/jellydn?tab=repositories"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="View all my repositories on GitHub"
                    >
                        View All Projects
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <a
                            key={project.name}
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                        >
                            <div className="card-body">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="card-title text-xl font-semibold">
                                        {project.name}
                                    </h3>
                                    <div className="badge badge-primary gap-1">
                                        <RepoStars stars={project.stars} />
                                    </div>
                                </div>
                                <p className="text-sm text-base-content/70 line-clamp-2 mb-4">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.language && (
                                        <span className="badge badge-ghost text-xs">
                                            {project.language}
                                        </span>
                                    )}
                                    {project.topics
                                        ?.slice(0, 2)
                                        .map((topic) => (
                                            <span
                                                key={topic}
                                                className="badge badge-outline text-xs"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
