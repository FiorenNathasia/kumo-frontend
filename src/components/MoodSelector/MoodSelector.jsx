import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function MoodSelector({ selectedMoods, setSelectedMoods }) {
  const handleMoodChanges = (event, newMoods) => {
    if (newMoods.length <= 3) setSelectedMoods(newMoods);
  };

  console.log(selectedMoods);

  return (
    <>
      {/* <ToggleButtonGroup
        value={selectedMoods}
        onChange={handleMoodChanges}
        aria-label="moods to choose"
        sx={{
          flexWrap: "wrap",
          gap: 1.5,
          justifyContent: "center",
          width: 360,
        }}
      >
        <ToggleButton
          value="😢"
          aria-label="devastated"
          sx={{
            fontSize: "2.5rem",
            height: "4rem",
          }}
        >
          😢
        </ToggleButton>
        <ToggleButton
          value="😔"
          aria-label="sad"
          sx={{ fontSize: "2.5rem", height: "4rem" }}
        >
          😔
        </ToggleButton>
        <ToggleButton
          value="😐"
          aria-label="neutral"
          sx={{ fontSize: "2.5rem", height: "4rem" }}
        >
          😐
        </ToggleButton>
        <ToggleButton
          value="😆"
          aria-label="happy"
          sx={{ fontSize: "2.5rem", height: "4rem" }}
        >
          😆
        </ToggleButton>
        <ToggleButton
          value="🤩"
          aria-label="enthusiastic"
          sx={{ fontSize: "2.5rem", height: "4rem" }}
        >
          🤩
        </ToggleButton>
        <ToggleButton
          value="🫣"
          aria-label="anxious"
          sx={{ fontSize: "2.5rem", height: "4rem" }}
        >
          🫣
        </ToggleButton>
        <ToggleButton
          value="😡"
          aria-label="frustrated"
          sx={{ fontSize: "2.5rem", height: "4rem" }}
        >
          😡
        </ToggleButton>
        <ToggleButton
          value="🥱"
          aria-label="exhausted"
          sx={{ fontSize: "2.5rem", height: "4rem" }}
        >
          🥱
        </ToggleButton>
        <ToggleButton
          value="🤯"
          aria-label="stressed"
          sx={{ fontSize: "2.5rem", height: "4rem" }}
        >
          🤯
        </ToggleButton>
        <ToggleButton
          value="💆"
          aria-label="relaxed"
          sx={{ fontSize: "2.5rem", height: "4rem" }}
        >
          💆
        </ToggleButton>
      </ToggleButtonGroup> */}

      <ToggleButtonGroup
        value={selectedMoods}
        onChange={handleMoodChanges}
        aria-label="moods to choose"
        sx={{
          flexWrap: "wrap",
          gap: 1.25,
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
                fontSize: "2.5rem",
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
