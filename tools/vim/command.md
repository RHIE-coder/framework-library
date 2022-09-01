# `~/.vimrc`
# h j k l
# w b e (단어 단위 이동)
# {number} i {type something} ESC
 - 30 i hello ESC
# f(앞)||F(뒤) + {word}
# % ( `(`, `{`, `[` )
# 0 $ (시작, 끝)
# *(앞으로 같은 단어), #(뒤로 같은 단어)
# gg, G, {line number} + G
# /{find word} + n||N
# o O
# r (replace)
# . (repeat)
# v
# :q, :w, :wq
# u, ctrl+R
# :!(shell command) terminal, :term 
# :vs, :sp
# `=` : 자동정렬
# Shift + v + gg or G

```
:20vs # 20칸 짜리 수평 분할
:10sp # 10칸 짜리 수직 분할

Ctrl + w, = # 동일 비율 크기 조절
Ctrl + w, _ # 현재 창 높이 최대화
Ctrl + w, | # 현재 창 너비 최대화

Ctrl + w, {n} + # 현재 창 높이 n칸 증가
Ctrl + w, {n} - # 현재 창 높이 n칸 감소

Ctrl + w, {n} > # 현재 창 너비 n칸 증가
Ctrl + w, {n} < # 현재 창 너비 n칸 감소

By default, when you create a vertically split window, it will open to the left. To change this default behavior, add the following line to your 'vimrc'.
$ set splitright

Similarly, if you create a new horizontally split window, it will open on the topmost portion of the Vim workspace. To make a new horizontally split window open on the bottom of current window, add the following line to your 'vimrc'.
set splitbelow
```

# :edit, :e
# i a I A
# H M L
# ctrl+u, ctrl+d
# { (문단시작), } (문단끝)
# `ex모드`의 `:`와 `?`의 차이는 검색 방향임
# `Netrw`: `:e`, `Vexplore`, `Sexplorer`,  

```
:he netrw-v

i : 디렉터리 리스팅 방법 변경.
I : 배너 On / Off 토글
d : 새 디렉터리 생성, 이름 입력 가능
D : 디렉터리 또는 파일 삭제, 삭제 전 확인
R : 디렉터리 또는 파일 이름 수정
s : 정렬 순서 변경(이름, 시간, 파일 사이즈, 확장자 / 상단에 표기)
gh : dot 파일 리스팅에서 추가 /제외 토글
o : 커서 위치의 디렉터리 또는 파일을 상하 스플릿 된 새 창으로 띄우기
v : 커서 위치의 디렉터리 또는 파일을 좌우 스플릿 된 새 창으로 띄우기
t : 커서 위치의 디렉터리 또는 파일을 새 탭으로 띄우기
u : 최근에 방문한 디렉터리로 이동 (뒤로 가기)
U : u 와 반대로 이동
% : 현재 디렉터리에 새 파일 열기, 파일 이름 입력
mb : 현재 디렉터리를 북마크
mB : 북마크에서 1번부터 삭제 (4번 북마크를 삭제하고 싶다면 4mB)
qb : 북마크된 디렉터리 리스팅
gb : 북마크 디렉터리로 이동 (4번으로 이동하고 싶다면 4gb)
```

https://dev-in-seoul.tistory.com/m/16

```vim
this is multiple line
this is multiple line
thiis is multiple lne
this is multiple line
this is 
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line
this is multiple line

```
# {Command} + {Object}
 - command : d(cut), y(yank), c(change)
 - object
```
aw: a word
at: a tag
ap: a paragraph
as: a sentence
i": 
t or T(
f or F(
/{word}
```

# c$ == C, cc (chagne line)
# "(a-z){command} : Regist 등록