import 'lite-youtube-embed/src/lite-yt-embed.css';
import 'lite-youtube-embed/src/lite-yt-embed.js';

const YoutubeVideo = ({
    videoId,
    title,
}: {
    videoId: string;
    title: string;
}) => (
    <lite-youtube
        videoid={videoId}
        style={{
            backgroundImage: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        }}
    >
        <button type="button" className="lty-playbtn">
            <span className="lyt-visually-hidden">{title}</span>
        </button>
    </lite-youtube>
);

export default YoutubeVideo;
