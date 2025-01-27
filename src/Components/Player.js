import React, { useState, useRef } from 'react';
import source from '../assets/source.mp4';
import ReactPlayer from 'react-player';
import { Button, Container, Grid, Typography, IconButton, Slider, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { styled } from '@mui/system';
import poster from '../assets/poster.jpg';

// Use styles
const useStyles = makeStyles({
    playerWrapper: {
        width: "100%",
        maxWidth: "900px",
        height: "500px",
        position: "relative",
        margin: "0 auto",
    },
    containerWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 1,
    },
    controlIcons: {
        color: "white",
        fontSize: 70, // Increased font size here
        transform: "scale(0.9)",
        "&:hover": {
            color: "white",
            transform: "scale(1)",
        },
    },
    bottomIcons: {
        color: "#999",
        "&:hover": {
            color: "#fff",
        },
    },
    volumeSlider: {
        width: 100,
    },
});

const PrettoSlider = styled(Slider)(() => ({
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&::before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#52af77',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&::before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
}));

function ValueLabelComponent(props) {
    const { children, value } = props;

    return (
        <Tooltip enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

function Player() {
    const classes = useStyles();
    const [playing, setPlaying] = useState(true);
    const [played, setPlayed] = useState(0); // Track the progress
    const [volume, setVolume] = useState(1); // Set initial volume to 1 (100%)
    const playerRef = useRef(null);

    // Play/Pause toggle
    const togglePlayPause = () => {
        setPlaying(!playing);
    };

    // Rewind video by 10 seconds
    const rewind = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    };

    // Fast forward video by 10 seconds
    const fastForward = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    };

    // Update played position
    const handleProgress = (state) => {
        setPlayed(state.played);
    };

    // Update volume when slider changes
    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue / 100); // Volume should be between 0 and 1
    };

    return (
        <Container maxWidth="lg">
            <div className={classes.playerWrapper}>
                <ReactPlayer
                    ref={playerRef}
                    width="100%"
                    height="100%"
                    url={source}
                    playing={playing}
                    muted={false}
                    volume={volume} // Use volume state here
                    onProgress={handleProgress} // Updates progress while playing
                />
                <div className={classes.containerWrapper}>
                    {/* Top bar with title and bookmark button */}
                    <Grid container direction="row" alignItems="center" justifyContent="space-between" style={{ padding: 16 }}>
                        <Grid item>
                            <Typography variant="h5" style={{ color: "#fff" }}>
                                Video Title
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<BookmarkIcon />}
                            >
                                Bookmark
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Playback controls */}
                    <Grid container direction="row" alignItems="center" justifyContent="center" style={{ marginBottom: "16px" }}>
                        <IconButton className={classes.controlIcons} aria-label="rewind" onClick={rewind}>
                            <FastRewindIcon style={{ fontSize: "45px" }} />
                        </IconButton>
                        <IconButton className={classes.controlIcons} aria-label="play" onClick={togglePlayPause}>
                            {playing ? <PauseIcon style={{ fontSize: "45px" }} /> : <PlayArrowIcon style={{ fontSize: "45px" }} />}
                        </IconButton>
                        <IconButton className={classes.controlIcons} aria-label="fast forward" onClick={fastForward}>
                            <FastForwardIcon style={{ fontSize: "45px" }} />
                        </IconButton>
                    </Grid>

                    {/* Video Progress and Volume Sliders */}
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" style={{ padding: "16px" }}>
                        {/* Video Progress Slider */}
                        <Grid item xs={12}>
                            <PrettoSlider
                                min={0}
                                max={100}
                                value={played * 100} // Use played state here
                                onChange={(_, value) => playerRef.current.seekTo(value / 100)}
                                ValueLabelComponent={ValueLabelComponent}
                            />
                        </Grid>
                        {/* Volume Control */}
                        <Grid item>
                            <Grid container direction="row" alignItems="center" spacing={1}>
                            <IconButton className={classes.bottomIcons} aria-label="play" onClick={togglePlayPause}>
                            {playing ? <PauseIcon style={{ fontSize: "45px" }} /> : <PlayArrowIcon style={{ fontSize: "45px" }} />}
                        </IconButton>
                                <IconButton className={classes.bottomIcons}>
                                    <VolumeUpIcon fontSize="large" />
                                </IconButton>
                                <Slider
                                    min={0}
                                    max={100}
                                    value={volume * 100}
                                    onChange={handleVolumeChange}
                                    style={{ width: '200px' }}  
                                />
                            </Grid>
                        </Grid>


                    </Grid>
                </div>
            </div>
        </Container>
    );
};

export default Player;
