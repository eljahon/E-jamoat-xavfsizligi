<template>
  <v-list
      class="navigation-list"
      flat>
    <v-list-item
        :to="item.to"
        :exact="item.exact"
        active-class="active"
        :ripple="false"
        v-for="item in navigations"
        style="white-space: nowrap"
        class="navigation-list-item"
        :key="item.title">
      <v-icon size="17" class="mr-4 mt-n1">{{item.icon}}</v-icon>
      {{ item.title }}
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      navigations: [
        {
          to: {name: "dashboard"},
          title: "Dashboard",
          exact: true,
          icon: "fas fa-tachometer-alt"
        },
      ]
    }
  }
}
</script>
