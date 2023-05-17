import React from 'react'
import { Grid, Paper, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';

const OversScreen = () => {
    const [candidates, setCandidates] = React.useState([
        { name: 'Aday 1', votes: 12345, img: '/path/to/image1.jpg' },
        { name: 'Aday 2', votes: 67890, img: '/path/to/image2.jpg' },
    ]);

    const [totalVotes, setTotalVotes] = React.useState(
        candidates.reduce((total, candidate) => total + candidate.votes, 0)
    );

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const handleVoteChange = (index:number, amount:number) => {
        if (isButtonDisabled) return; // disable button if already clicked

        setIsButtonDisabled(true); // disable button
        setTotalVotes((prevTotalVotes) => prevTotalVotes + amount);
        setCandidates((prevCandidates) => {
            const newCandidates = [...prevCandidates];
            newCandidates[index].votes += amount;
            return newCandidates;
        });

        setTimeout(() => {
            setIsButtonDisabled(false); // enable button after 1 second
        }, 1000);
    };



    const getCandidatePercentage = (votes:any) => ((votes / totalVotes) * 100).toFixed(2);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Cumhurbaşkanlığı Seçimi</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 2 }}>
                        Toplam oy: {totalVotes}
                    </Typography>
                    {candidates.map((candidate, index) => (
                        <Typography variant="subtitle1" sx={{ ml: 2 }} key={index}>
                            {candidate.name}: %{getCandidatePercentage(candidate.votes)}
                        </Typography>
                    ))}
                </Toolbar>
            </AppBar>
            <Grid container spacing={2}>
                {candidates.map((candidate, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Paper style={{ padding: '16px', textAlign: 'center' }}>
                            <img
                                src={candidate.img}
                                alt={candidate.name}
                                style={{ width: '100%', maxWidth: '200px', height: 'auto' }}
                            />
                            <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '16px' }}>
                                {candidate.name}
                            </Typography>
                            <Typography variant="body1" style={{ marginTop: '8px' }}>
                                Toplam oy: {candidate.votes}
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                                <button onClick={() => handleVoteChange(index, 1)} disabled={isButtonDisabled}>
                                    +
                                </button>
                                <button onClick={() => handleVoteChange(index, -1)} disabled={isButtonDisabled}>
                                    -
                                </button>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default OversScreen;
