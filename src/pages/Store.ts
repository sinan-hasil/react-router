import { create } from "zustand";

interface LikePosts {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  userId: number;
}

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  userId: number;
}

interface Store {
  loadingPost: boolean;
  loadingAlbum: boolean;
  loadingTodo: boolean;
  loadingPostComments: boolean;
  loadingAlbumComments: boolean;
  loadingTodoComments: boolean;
  likeCount: number;
  favorites: Photo[];
  postLike: LikePosts[];
  postLikeCount: number; 
  setLoadingPost: (loading: boolean) => void;
  setLoadingAlbum: (loading: boolean) => void;
  setLoadingTodo: (loading: boolean) => void;
  setLoadingPostComments: (loading: boolean) => void;
  setLoadingAlbumComments: (loading: boolean) => void;
  setLoadingTodoComments: (loading: boolean) => void;
  setLikeCount: (count: number) => void;
  addFavorite: (photo: Photo) => void;
  setPostLikeCount: (countPost: number) => void;
  setPostLike: (Post: LikePosts) => void;
}

const useStore = create<Store>((set) => ({
  loadingPost: false,
  loadingAlbum: false,
  loadingTodo: false,
  loadingPostComments: false,
  loadingAlbumComments: false,
  loadingTodoComments: false,
  likeCount: 0,
  favorites: [],
  postLike: [],
  postLikeCount: 0,
  setLoadingPost: (loading) => set({ loadingPost: loading }),
  setLoadingAlbum: (loading) => set({ loadingAlbum: loading }),
  setLoadingTodo: (loading) => set({ loadingTodo: loading }),
  setLoadingPostComments: (loading) => set({ loadingPostComments: loading }),
  setLoadingAlbumComments: (loading) => set({ loadingAlbumComments: loading }),
  setLoadingTodoComments: (loading) => set({ loadingTodoComments: loading }),
  setLikeCount: (count) => set({ likeCount: count }),
  setPostLikeCount: (countPost) => set({ postLikeCount: countPost }),
  addFavorite: (photo) => set((state) => ({
    favorites: [...state.favorites, photo]
  })),
  setPostLike: (post) => set((state) => ({
    postLike: [...state.postLike, post]
  }))
}));

export default useStore;
