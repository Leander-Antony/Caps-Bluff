import os
import random
from PIL import Image

# Load all card images and the background image
card_folder = "img/cards"
bg_image = Image.open(os.path.join(card_folder, "bg.jpg"))

# Create a list of card images
card_images = []
for filename in os.listdir(card_folder):
    if filename.endswith(".png"):  # Assuming cards are in PNG format
        card_images.append(Image.open(os.path.join(card_folder, filename)))

# Check if we have exactly 5 cards
if len(card_images) == 4:
    # Multiply the 5 cards to make 20 cards
    card_images = card_images * 5  # Duplicate the 5 cards to make 20
    print(f"Duplicating the 5 cards to make 20 cards for distribution.")
else:
    print(f"Warning: You have {len(card_images)} cards. Exactly 5 cards are expected.")

# Shuffle the card images
random.shuffle(card_images)

# Number of cards per player and players
cards_per_player = 5
num_players = 4

# Distribute cards to players
player_cards = {i: [] for i in range(1, num_players + 1)}
for i in range(cards_per_player):
    for player in range(1, num_players + 1):
        player_cards[player].append(card_images.pop(0))

# Create images for each player with the background
for player, cards in player_cards.items():
    player_img = bg_image.copy()

    # Paste cards into the player's image (adjust card positions as needed)
    x_offset = 50
    y_offset = 100
    for card in cards:
        player_img.paste(card, (x_offset, y_offset))
        x_offset += card.width + 10  # Adjust x_offset to space the cards

    # Save the final image for the player
    player_img.save(f"player_{player}_hand.jpg")
    print(f"Player {player}'s cards distributed and saved as player_{player}_hand.jpg")
