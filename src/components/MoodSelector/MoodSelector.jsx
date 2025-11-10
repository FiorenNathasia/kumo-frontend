import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function MoodSelector({ selectedMoods, setSelectedMoods }) {
  const handleMoodChanges = (event, newMoods) => {
    if (newMoods.length <= 3) setSelectedMoods(newMoods);
  };

  return (
    <>
      <ToggleButtonGroup
        value={selectedMoods}
        onChange={handleMoodChanges}
        aria-label="moods to choose"
        sx={{
          flexWrap: "wrap",
          gap: { xs: 1.25, md: 4 },
          justifyContent: "center",
        }}
      >
        {["😢", "😔", "😐", "😆", "🤩", "🫣", "😡", "🥱", "🤯", "💆"].map(
          (emoji) => (
            <ToggleButton
              key={emoji}
              value={emoji}
              disableRipple
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                width: 60,
                height: 60,
                border: "none",
                minWidth: 0,
                padding: 0,
                "&.Mui-selected": {
                  border: "none",
                  borderRadius: "50%",
                  backgroundColor: "blue",
                  width: 55,
                  height: 55,
                },
              }}
            >
              {emoji}
            </ToggleButton>
          )
        )}
      </ToggleButtonGroup>
    </>
  );
}

export default MoodSelector;
