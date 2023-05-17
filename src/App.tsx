import React from 'react'
import {Grid, Paper, Stack, Typography} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import kk from "./assets/kk.jpg"
import rte from "./assets/rte.jpg"

const OversScreen = () => {
  const [candidates, setCandidates] = React.useState([
    {name: 'Recep Tayyip Erdoğan', votes: 10, img: rte},
    {name: 'Kemal Kılıçdaroğlu', votes: 20, img: kk},
  ]);
  
  const [totalVotes, setTotalVotes] = React.useState(
    candidates.reduce((total, candidate) => total + candidate.votes, 0)
  );
  
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  
  const handleVoteChange = (index: number, amount: number) => {
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
  
  const getCandidatePercentage = (votes: number) => ((votes / totalVotes) * 100).toFixed(2);
  
  return (
    <div>
      <AppBar position="static">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography fontSize="1rem" sx={{ml: 2, textAlign: 'center'}}>
            {candidates[0].name}: <b>%{getCandidatePercentage(candidates[0].votes)}</b>
          </Typography>
          <Stack>
            <Typography fontSize="1.2rem" sx={{textAlign: 'center'}}>Cumhurbaşkanlığı Seçimi</Typography>
            <Typography fontSize="1rem" sx={{textAlign: 'center'}}>
              Toplam oy: {totalVotes}
            </Typography>
          </Stack>
          <Typography fontSize="1rem" sx={{mr: 2, textAlign: 'center'}}>
            {candidates[1].name}: <b> %{getCandidatePercentage(candidates[1].votes)}</b>
          </Typography>
        </Stack>
      </AppBar>
      <Grid container spacing={4} p={3} mt={3}>
        {candidates.map((candidate, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper style={{padding: '16px', textAlign: 'center'}} elevation={20}>
              <img
                src={candidate.img}
                alt={candidate.name}
                style={{width: '100%', maxWidth: '130px', height: '150px', maxHeight: '150px'}}
              />
              <Typography fontSize="1.4em" variant="h6" style={{fontWeight: 'bold', marginTop: '16px'}}>
                {candidate.name}
              </Typography>
              <Typography variant="body1" style={{marginTop: '8px'}}>
                Toplam oy: <b>{candidate.votes}</b>
              </Typography>
              <div style={{display: 'flex', justifyContent: 'center', marginTop: '16px'}}>
                <button
                  onClick={() => handleVoteChange(index, 1)}
                  disabled={isButtonDisabled}
                  style={{fontSize: '18px', padding: '8px 16px', marginRight: '8px'}}
                >
                  +
                </button>
                <button
                  onClick={() => handleVoteChange(index, -1)}
                  disabled={isButtonDisabled}
                  style={{fontSize: '18px', padding: '8px 16px'}}
                >
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
