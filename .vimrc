set nocompatible
source $VIMRUNTIME/vimrc_example.vim
"source $VIMRUNTIME/mswin.vim
behave mswin
"set ff=unix
"set textwidth=80
set tabstop=3
set shiftwidth=3
set textwidth=0
set number
set syn=on
set sts=3
set expandtab
set wrap!
set foldcolumn=1
set incsearch
set mouse=a
"set fdm=syntax
set wrap


function! CHANGE_CURR_DIR() 
    let _dir = expand("%:p:h") 
    exec "cd " . _dir 
    unlet _dir 
endfunction 

autocmd BufEnter * call CHANGE_CURR_DIR()


highlight OverEighty guibg=red ctermbg=lightgrey
match OverEighty /\%81v/                                                          


"noremap yy "+yy
"nmap <C-S-C> yy
"imap <C-S-C> <esc>yyi
"vmap <C-S-C> Y

"nmap <C-S-X> "+dd
"imap <C-S-X> <esc>"+ddi
"vmap <C-S-X> "+D

nmap <C-J> :join<Return>
imap <C-J> <esc>:join<Return>i
vmap <C-J> :join<Return>

"nmap <A-Down> :move .+1<Return>
"imap <A-Down> <esc>:move .+1<Return>i
"vmap <A-Down> :move '>+1<Return>
"nmap <A-Up> :move .-2<Return>
"imap <A-Up> <esc>:move .-2<Return>i
"vmap <A-Up> :move '<-2<Return>

"nmap <S-A-Down> :copy .<Return>
"imap <S-A-Down> <esc>:copy .<Return>i
"vmap <S-A-Down> :copy '><Return>
"nmap <S-A-Up> :copy .-1<Return>
"imap <S-A-Up> <esc>:copy .-1<Return>i
"vmap <S-A-Up> :copy '<-1<Return>

map <C-F> :lv  %<left><left>
nmap gtl :call TimeLapse() <cr> 
