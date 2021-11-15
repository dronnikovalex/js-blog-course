import { CreateComponent } from "./components/create.component";
import { FavoriteComponent } from "./components/favorite.component";
import { HeaderComponent } from "./components/header.component";
import { NavigationComponent } from "./components/navigation.component"
import { PostsComponent } from "./components/posts.component";
import { Loader } from "./components/loader.component";
import css from "./css/index.css"

new HeaderComponent('header')

const navigation = new NavigationComponent('navigation')
const loader = new Loader('loader')

const create = new CreateComponent('create')
const favorite = new FavoriteComponent('favorite', {loader})
const posts = new PostsComponent('posts', {loader})



navigation.registerTabs([
  { name: 'create', component: create },
  { name: 'favorite', component: favorite },
  { name: 'posts', component: posts }
])