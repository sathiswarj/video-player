import React, { useState, forwardRef } from 'react';
import { Button, Grid, Typography, IconButton, Slider, Tooltip, Popover } from '@mui/material';
import { makeStyles } from '@mui/styles';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FullScreenIcon from '@mui/icons-material/Fullscreen';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { styled } from '@mui/system';

// Styles
const useStyles = makeStyles({
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
        fontSize: 70,
        transform: "scale(0.9)",
        "&:hover": {
            transform: "scale(1)",
        },
    },
    bottomIcons: {
        color: "#fff",
        "&:hover": {
            color: "#fff",
        },
    },
});

const PrettoSlider = styled(Slider)({
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
    },
});

const ValueLabelComponent = (props) => {
    const { children, value } = props;
    return (
        <Tooltip enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
};

const PlayControls = forwardRef(({ playerRef, playing, onRewind, onFastForward, onProgressChange, onVolumeSeekUp, onToggleFullScreen, played, setPlayed, playBackRate, onPlayBackChange, volume, onVolumeChange, onPlayPause, onMute, muted, onSeek, onSeekMouseUp, onMouseDown, elapsedTime, totalDuration, ref }) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'playbackrate-popover' : undefined;


    return (
        <div className={classes.containerWrapper} ref={ref}>
            {/* Top bar */}
            <Grid container alignItems="center" justifyContent="space-between" style={{ padding: 16 }}>
                <Typography variant="h5" style={{ color: "#fff" }}>
                    Video Title
                </Typography>
                <Button variant="contained" color="primary" startIcon={<BookmarkIcon />}>
                    Bookmark
                </Button>
            </Grid>

            {/* Playback controls */}
            <Grid container justifyContent="center" alignItems="center" style={{ marginBottom: "16px" }}>
                <IconButton className={classes.controlIcons} onClick={onRewind}>
                    <FastRewindIcon style={{ fontSize: "45px", color: "#fff" }} />
                </IconButton>
                <IconButton className={classes.controlIcons} onClick={onPlayPause}>
                    {playing ? <PauseIcon style={{ fontSize: "45px", color: "#fff" }} /> : <PlayArrowIcon style={{ fontSize: "45px", color: "#fff" }} />}
                </IconButton>
                <IconButton className={classes.controlIcons} onClick={onFastForward}>
                    <FastForwardIcon style={{ fontSize: "45px", color: "#fff" }} />
                </IconButton>
            </Grid>

            {/* Progress and volume controls */}
            <Grid container justifyContent="space-between" alignItems="center" style={{ padding: "16px" }}>
                {/* Progress Slider */}
                <Grid item xs={12}>
                    <PrettoSlider
                        min={0}
                        max={100}
                        value={played * 100}
                        onChange={onSeek}
                        onMouseDown={onMouseDown}
                        onChangeCommitted={onSeekMouseUp}
                        ValueLabelComponent={ValueLabelComponent}
                    />



                </Grid>

                {/* Volume Control */}
                <Grid item>
                    <Grid container alignItems="center" spacing={1}>
                        <IconButton className={classes.bottomIcons} onClick={onPlayPause}>
                            {playing ? <PauseIcon style={{ fontSize: "large", color: "#fff" }} /> : <PlayArrowIcon style={{ fontSize: "large", color: "#fff" }} />}
                        </IconButton>
                        <IconButton onClick={onMute} className={classes.bottomIcons}>
                            {muted ? <VolumeOffIcon style={{ fontSize: "large", color: "#fff" }} /> : <VolumeUpIcon style={{ fontSize: "large", color: "#fff" }} />}
                        </IconButton>
                        <Slider min={0} max={100} value={volume * 100} onChange={onVolumeChange} onChangeCommitted={onVolumeSeekUp} style={{ width: '100px' }} />
                        <Button variant='text' style={{ color: "#fff", marginLeft: 16 }}><Typography>{elapsedTime}/{totalDuration}</Typography></Button>
                    </Grid>
                </Grid>

                <Grid item>
                    <Button variant='text' onClick={handleClick} className={classes.bottomIcons}>
                        <Typography color="#fff">{playBackRate}</Typography>
                    </Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                    >
                        <Grid container direction="column-reverse">
                            {
                                [0.5, 1, 1.5, 2].map((rate) => (
                                    <Button variant='text' onClick={() => onPlayBackChange(rate)}>
                                        <Typography color={rate === playBackRate ? 'secondary' : 'default'}>{rate} X</Typography>
                                    </Button>
                                ))
                            }
                        </Grid>
                    </Popover>
                    <IconButton className={classes.bottomIcons} onClick={onToggleFullScreen}>
                        <FullScreenIcon style={{ fontSize: "large", color: "#fff" }} />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );
});

export default PlayControls;
