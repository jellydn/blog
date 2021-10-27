import 'lite-youtube-embed/src/lite-yt-embed.css';
import 'lite-youtube-embed/src/lite-yt-embed.js';

const YoutubeVideo = ({
    videoId,
    title,
}: {
    videoId: string;
    title: string;
}) => (
    // @ts-expect-error Property  does not exist on type 'JSX.IntrinsicElements'
    <lite-youtube
        videoid={videoId}
        style={{
            backgroundImage: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        }}
    >
        <button type="button" className="lty-playbtn">
            <span className="lyt-visually-hidden">{title}</span>
        </button>
        {/* @ts-expect-error Property  does not exist on type 'JSX.IntrinsicElements' */}
    </lite-youtube>
);

export default YoutubeVideo;
