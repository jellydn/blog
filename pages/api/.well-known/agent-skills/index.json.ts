import {
    ensureGet,
    handleOptions,
    sendDiscoveryResponse,
} from 'lib/api-helpers';
import { SITE_URL } from 'lib/constants';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Agent Skills Discovery Index (RFC v0.2.0)
 *
 * Returns a skills discovery index at /.well-known/agent-skills/index.json
 * per the Agent Skills Discovery RFC.
 *
 * @see https://github.com/cloudflare/agent-skills-discovery-rfc
 * @see https://agentskills.io/
 */

interface Skill {
    name: string;
    type: string;
    description: string;
    url: string;
    sha256: string;
}

interface AgentSkillsIndex {
    $schema: string;
    skills: Skill[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<AgentSkillsIndex | { error: string }>,
): void {
    if (handleOptions(req, res)) return;
    if (!ensureGet(req, res)) return;

    const baseUrl = SITE_URL;

    const skillsIndex: AgentSkillsIndex = {
        $schema: 'https://agentskills.io/schemas/index.json',
        // NOTE: SHA256 values below are placeholders (hash of empty string).
        // Replace with actual content hashes when skill specifications are finalized.
        // To compute: sha256sum skill-definition.json
        skills: [
            {
                name: 'fetch-blog-posts',
                type: 'api',
                description:
                    'Fetch recent blog posts from Hashnode and local markdown files',
                url: `${baseUrl}/api/posts`,
                sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            },
            {
                name: 'fetch-youtube-videos',
                type: 'api',
                description: 'Fetch recent YouTube videos from the channel',
                url: `${baseUrl}/api/youtube-videos`,
                sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            },
            {
                name: 'search-notes',
                type: 'api',
                description:
                    'Search through notes and blog posts by tag or content',
                url: `${baseUrl}/notes`,
                sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            },
            {
                name: 'get-github-repos',
                type: 'data',
                description:
                    'Access GitHub repository data including stars and descriptions',
                url: `${baseUrl}/data/repos.json`,
                sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            },
        ],
    };

    sendDiscoveryResponse(res, skillsIndex, {
        contentType: 'application/json',
        cacheControl: 'public, s-maxage=300, stale-while-revalidate=900',
    });
}
