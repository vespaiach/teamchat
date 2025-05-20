#! /bin/bash

tmux new-session -s chatter
tmux send-keys 'overmind s -f Procfile.dev' C-m
tmux split-window -h
tmux send-keys 'overmind c web' C-m
tmux new-window
tmux send-keys 'psql -U master -d chatter_development' C-m
tmux new-window
tmux send-keys 'rails c' C-m
tmux split-window -h
tmux resize-pane -Z
tmux send-keys 'code .' C-m