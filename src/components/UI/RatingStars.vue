<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useFilmsStore} from "@/store/films";
import {useUsersStore} from "@/store/users";
import {Film} from "@/types/Film";

const props = defineProps<{
  film: Film
}>()

onMounted(() => {
  if (props.film.userRating) {
    selectedStar.value = props.film.userRating
  }
})
const filmsStore = useFilmsStore()
const usersStore = useUsersStore()

const rating = ref()
const emptyStar = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFGklEQVR4nO1aWYhcRRQtTdziEncxLkjABQ1+iIoLLh+Cmg/FFfwwahS/NAZF8hOJfwY3cCNEA4kLBKIIMRhxSzsBRaVxxsl759StN83okDEaMWoCJjHLk1tz39DOZKY75nWnGzxQ0Lyqd27delV3q3bufzRGnueHCvlFIHv0t+tWSJreEMhcm/523YpAriwU0d+uG5EkyYkCbBdgt7UdAE5y3QYh58UvAawV4KO4vch5rtsQyF7bUncE8k5Tqt91E0heahP/NYRwRJIkhwvwiz7TPtctEGCJKfJ88SyQL8TtBSxx3YChoaGjhPw9KpIkFxbPvfcXCLBXgD+Gq9VprtMhwBxb+S/H9ZFfWd8c1+kIZI8d8rnj+tL0QevrcZ0MAOfp9gnkNpLHju1PkuSYAGxVZXSruU6FkIttxd+YZMwy8ynPuE5EpVKZGoBhs1ZXTDQuA640RX6uVquHuU5D5v2tpgQbjRUy1bEZeYvrNAjwQdz7wOMNx5JPmPVa7dqJ4Wp1WgjhFBGZmQGXSJpeK2k6O/P+LiEfFvLJQO4K5E4d14hPx8Sx5C59VzkiV5rOVu4oQ2Smjmva52Rpem8gVwjwXiA/DcA3+umF/EHILQLsqQvFJ20CrGp2cQR4dz9498S5jMwp1TnqXG3OK1QHJdzcBNH2GDcBNSG/C+R6i2pXBfJ1IV8MwCIApzerCMkZ+k58VzmUC1ir3FEGUFOZUXbj+W3WQ3qThg12ULdm3t89AMwiec6P/f0n5Hk+xR1k5Hk+Reeic9K56RwLf6RzVx3iwIE0PTcAKCLWjLzedSgy8iohN5kJz+rjuYgQwnGF5YmHEHjEdRg88JAZCVXiY/1KE37COu+sbWknOK1KpTJ17Lz0WcMXBbhHgL/spfUDAwOnuoOY+wfyMzsPOwL5wH4RRFtODtm5qekhc20GyfMD4G1Bf5os9GlENCOQXxvRNgFuc22CqHM0a6rmuJYkZx8QoebcAVhun3av7tVWVg3zPD8kAAvqHPHKUjNKDSMsDIkevK+v72hXMgYHB48U4G2TsVsVcq2A9/7m0Xyc7M02bDirLG7lClZCUhkqy7XtAALLy+LVmCmMcHqVURZvI6GvmNBFpXECi4zz5bI4mxFKy7uvLotTucKIInDtgJnkGGCW6fWj9wb+jNwhnOlaDQHuswO5pnRuck3b6l5CvmVfZH7Z3AGYbxbxzbK59yVsowprRcgyAMyyRRpWx+haBY39bVttakaQmlG9G9HWTEEuV6+uMdWYunHLLm/U+zZR41owJk39W8MbvWKYVAbwji3Wo6UrUCdktU1qwlBaRC4PwPd1sdmy2EZKqfGyR8dM+D55f0tLRWYeYzS6r9DErhMWxxjJQv/6m1xJ02sK/2MB4VKtBY9TROSMVpj3caVODSHG9gXgOiFDkSYH4KV9BZWm7NNFuhqAwYy8cRwfKY1Kr/8ZAXjKJvpq8Wywt/d4Xdm6bdPnvb+sEZf3/uIAfFtfD/Pen1z0C/manZOFpSti/2DIi+QqVgbtXlDTYl3p/dkK0SCQj2nCZgr9pqlClAXcbryVUpXQxEbzZd3/WZpeFMj366zR+gOJVrU0KuQndXwf6hezs7az1LxHC2DFyo8WxsgteitVhuMy/zHXOONBL4ofo8W3MhCA5/5VoiTXqHVxJaPW33/aaAhUNODZ0gQIsM5IN+o9iGvHXQtGQqEAfF4asZnXhbVabbprE2q12nSVqbLbJbMj8A8Oaqfo4EiAVQAAAABJRU5ErkJggg==')
const activeStar = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADbElEQVR4nO2aTWgdVRTHb9TabNTWQq0fm0JpsbVd2CJCIW4EBTdKaaH0g0JtF1Vou2kQF0JLobhQsmihUKgG3IkiBoV+EBRp2vAg8Drz/99z3ns+VNoILqo0fqAxI3fyEpJHXt68ZO68GfAPB2Yz957fzD1nzj13jPlf7VWv13uFHFHgehRFPaaoEmCvkpEzCcM+U1QJeWUGRIHLpohS1WcEmJwFISdU9VFTNCnw3hyI2CzwpimSoijqUaDWDCLkDVMkSRi+3Awxa0Gw2RRFAnzSEgR43xRBtVrtMSF/bwUi5M+lUmmFybss8FbLtzET9GH4usm7hCy1AxHgC5NnkdzaDqJh/wB40uRVCgwkBIk0DE+ZPCoIgocV+CUxCCm5LCQr1u7pAGI66K3dafImAb7uFETIS5k6WR8bWxUXgSLPisgLjS/3LiEPCfC2kO82FYhJ7b4C/QocE+CgAG+4sUnuILlJRJ5OXGgKcETIQSU/U/JqnD4Bq8AdAX5bgnNeTIBfBfhJASgwGvsKfKrkRxVrd5u4vM6Bo8syoOaC9FVH23VnlvGmKuQr8fKqBMEGIcPCQZDq4nZerJB8RMnPu+2cJjXgK5eEFtsQ9Qvwb46X0pSQ56IoeqBtJnNZII9JQIA/1dr9phNZa7cp8H1uIMgfq+R2sxQBWKPktW5DKPlttVpda5aj4eHhh9ya7CLExVR3lEruE+CPDOPhLw3Dw8aHKsDzbq1mAHJXgReNT5F8qlHr+IEARt0cJgsJ+aG3JUV+kAlEAyTwCHI7E4h6EKxzX1ePQT6VSWPCbYB8B3slDA/4B5nehHkFUfJjrxBxUelSo2cQIce9dliqwHMZvI2osby2eANR4ERWIEoe9wdCDnXozN8KnI3NXXd275C/TqJr3yR3ZGxu2R33hYFbHdw/oaorUwdR4KVEgeoKS6A/iqIHm8dwuzohjyZ9IOLjSFuBMwkm/wbAxnZjWWvXzzu6bp29TqcPQt5cZMJ77kl3mjLjLfUijW8hR1KFcN2KVi1RIb90rc2ljl0rl59o9ZEVYPKHcnl1aiCuJ7sAwLjr/6Y4x2sL7XVSPaYT4EJTO2YwCILHjYeDVAUG5rajhDyf2gQKfNcYWLL4OUbCsM/NlfpPBm5gAd5xvy2ZjFSv13sVOOnSflZz5kL/AYkYkGtuhVNLAAAAAElFTkSuQmCC')
const hoveredStar = ref()
const selectedStar = ref()
const mouseover = (index: number) => {
  hoveredStar.value = index
  rating.value = hoveredStar.value + 1
}
const mouseout = () => {
  hoveredStar.value = undefined
  if (selectedStar.value >= 0) {
    rating.value = selectedStar.value + 1
  } else {
    rating.value = undefined
  }
}
const selectStar = async (index: number) => {
  selectedStar.value = index
  rating.value = selectedStar.value + 1
  props.film.userRating = rating.value
  if (filmsStore.ratedFilms.filter(f => f.id === props.film.id).length === 0) {
    filmsStore.ratedFilms.push(props.film)
    filmsStore.savedFilms.find(f => f.id === props.film.id).userRating = rating.value
  }
}

</script>

<template>
  <div class="rating">
    <div v-for="(star, index) in 10"
         :key="index"
         class="stars"
         @mouseover="mouseover(index)"
         @mouseout="mouseout()"
         @click="selectStar(index)"
    >
      <div class="star">
        <img :src="index <= hoveredStar || index <= selectedStar ? activeStar : emptyStar" alt="star">
      </div>
    </div>
    <span style="margin-left: 30px">Your Rating: {{rating}}</span>
  </div>
</template>

<style lang="scss" scoped>
.rating {
  display: flex;
  align-items: center;
}
.stars {
  display: inline-block;
}
.stars img {
  width: 30px;
}
.star:hover {
  transform: scale(1.2);
}
.star {
  padding: 3px 3px 3px 3px;
}
</style>
