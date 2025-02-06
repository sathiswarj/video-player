import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PlayControls from './PlayControls';
import source from '../../assets/video.mp4';
import screenfull from 'screenfull';

const useStyles = makeStyles({
    playerWrapper: {
        width: "100%",
        maxWidth: "900px",
        height: "500px",
        position: "relative",
        margin: "0 auto"
    }
});

function Player() {
    const classes = useStyles();
    const playerRef = useRef(null);
    const playerContainer = useRef(null);
    const controllersRef = useRef(null);

    const [playingState, setPlayingState] = useState({
        playing: true,
        muted: true,
        volume: 0.5,
        playBackRate: 1.0,
        played: 0,
        seeking: false,
    });

    const [controlsVisibility, setControlsVisibility] = useState(true);
    
    const { playing, muted, volume, playBackRate, played, seeking } = playingState;

    const handlePlayPause = () => {
        setPlayingState((prevState) => ({ ...prevState, playing: !prevState.playing }));
    };

    const handleMute = () => {
        setPlayingState((prevState) => ({ ...prevState, muted: !prevState.muted }));
    };

    const handleVolumeChange = (_, newValue) => {
        setPlayingState((prevState) => ({
            ...prevState,
            volume: parseFloat(newValue / 100),
            muted: newValue === 0
        }));
    };

    const handleVolumeSeekUp = (_, newValue) => {
        setPlayingState((prevState) => ({
            ...prevState,
            volume: parseFloat(newValue / 100),
            muted: newValue === 0
        }));
    };

    const rewind = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
        }
    };

    const fastForward = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
        }
    };

    const handleProgress = (changeState) => {
        if (!playingState.seeking) {
            setPlayingState((prevState) => ({ ...prevState, ...changeState }));
        }
    };

    const handleSeekChange = (_, newValue) => {
        setPlayingState((prevState) => ({
            ...prevState,
            played: parseFloat(newValue / 100)
        }));
    };

    const handleMouseDown = () => {
        setPlayingState((prevState) => ({ ...prevState, seeking: true }));
    };

    const handleMouseUp = (_, newValue) => {
        setPlayingState((prevState) => ({ ...prevState, seeking: false }));
        if (playerRef.current) {
            playerRef.current.seekTo(newValue / 100);
        }
    };

    const handlePlayBackChange = (rate) => {
        setPlayingState((prevState) => ({
            ...prevState,
            playBackRate: rate
        }));
    };

    const toggleFullScreen = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle(playerContainer.current);
        }
    };

    const format = (seconds) => {
        if (isNaN(seconds)) {
            return "00:00";
        }
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = date.getUTCSeconds().toString().padStart(2, '0');

        if (hh) {
            return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
        }
        return `${mm}:${ss}`;
    };

    const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : "00:00";
    const durationTime = playerRef.current ? playerRef.current.getDuration() : "00:00";

    const elapsedTime = format(currentTime);
    const totalDuration = format(durationTime);

    const handleMouseMove = () => {
        setControlsVisibility(true);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setControlsVisibility(false);
        }, 3000); // Hide controls after 3 seconds of no mouse movement

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [controlsVisibility]);

    return (
        <Container maxWidth="lg">
            <div ref={playerContainer} className={classes.playerWrapper} onMouseMove={handleMouseMove}>
                <ReactPlayer
                    ref={playerRef}
                    width="100%"
                    height="100%"
                    url={source}
                    playing={playing}
                    volume={volume}
                    muted={muted}
                    playbackRate={playBackRate}
                    onProgress={handleProgress}
                />
                {controlsVisibility && (
                    <PlayControls
                        ref={controllersRef}
                        playerRef={playerRef}
                        playing={playing}
                        onPlayPause={handlePlayPause}
                        played={played}
                        volume={volume}
                        onMute={handleMute}
                        muted={muted}
                        onVolumeChange={handleVolumeChange}
                        onVolumeSeekUp={handleVolumeSeekUp}
                        onRewind={rewind}
                        onFastForward={fastForward}
                        playBackRate={playBackRate}
                        onPlayBackChange={handlePlayBackChange}
                        onToggleFullScreen={toggleFullScreen}
                        onSeek={handleSeekChange}
                        onMouseDown={handleMouseDown}
                        onSeekMouseUp={handleMouseUp}
                        elapsedTime={elapsedTime}
                        totalDuration={totalDuration}
                    />
                )}
            </div>
        </Container>
    );
}

export default Player;
