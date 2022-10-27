# ddc-source-omni

Omnifunc completion for ddc.vim

This source collects candidates from 'omnifunc'.

Note: It does not support all of 'omnifunc'.

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### ddc.vim

https://github.com/Shougo/ddc.vim

## Configuration

```vim
call ddc#custom#patch_global('sources', ['omni'])

" Change source options
call ddc#custom#patch_global('sourceOptions', {
      \ 'omni': {'mark': 'O'},
      \ })

" Example: Use vimtex
"call vimtex#init()
"call ddc#custom#patch_filetype(['tex'], 'sourceOptions', {
"      \ 'omni': {
"      \   'forceCompletionPattern': g:vimtex#re#deoplete
"      \ },
"      \ })
"call ddc#custom#patch_filetype(['tex'], 'sourceParams', {
"      \ 'omni': {'omnifunc': 'vimtex#complete#omnifunc'},
"      \ })
```
