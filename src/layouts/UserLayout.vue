<template>
<!--  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">-->
    <div class='userLayout'>
      <div class='right'>
        <div class='header'>
          <img class="logo2" src="../assets/z-logo.svg" alt='logo'>
        </div>
        <div class='login'>
          <div class='desc'>
            Добро пожаловать
          </div>
          <router-view />
        </div>
        <div class='copyright'>
          Inspired Artisans Copyright &copy; 2021
        </div>
      </div>
      <div class='left'>
        <img class="logo" src="../assets/z-logo.svg" alt='logo'>
      </div>
    </div>
<!--  </div>-->
</template>

<script>
import { deviceMixin } from '@/store/device-mixin'

export default {
  name: 'UserLayout',
  mixins: [deviceMixin],
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
@media screen {
  @media (max-width: 740px) {
    .left {
      background-color: #52c41a;
      display: none !important;
    }
    .right {
      width: 100% !important;
    }
    .header {
      opacity: 1 !important;
    }
    .desc {
      font-size: 24px !important;
    }
    .login {
      width: 80% !important;
    }
  }
}
.mobile {
  .userLayout {
    .left {
      display: none;
    }
  }
}
.userLayout {
  display: flex;
  height: 100vh;
  width: 100%;
  .left {
    width: 65%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    .logo {
      width: 480px;
      height: 480px;
    }
    .logo_text {
      color: rgba(0, 0, 0, 0.45);
      font-family: 'Monoton', cursive;
      font-size: 56px;
    }
  }
  .right {
    width: 35%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: column;
    .logo2 {
      width: 200px;
    }
    .header {
      font-size: 48px;
      color: rgba(0, 0, 0, 0.45);
      font-family: 'Monoton', cursive;
      opacity: 0;
      transform: translateY(120px);
    }
    .copyright {
      margin-bottom: 10px;
      color: rgba(0, 0, 0, 0.45);
    }
    .login {
      width: 60%;
      //text-align: center;
      .desc {
        text-align: center;
        color: rgba(0, 0, 0, 0.45);
        font-size: 36px;
        margin: 30px 0;
      }
    }
    //.container {
    //  width: 100%;
    //  display: flex;
    //  align-items: center;
    //  justify-content: space-between;
    //  flex-flow: column;
    //  .desc {
    //    color: rgba(0, 0, 0, 0.45);
    //    font-size: 36px;
    //    margin: 20px 0;
    //  }
    //}
  }
}
//#userLayout.user-layout-wrapper {
//    height: 100%;
//
//    &.mobile {
//      .container {
//        .main {
//          max-width: 368px;
//          width: 98%;
//        }
//      }
//    }
//
//    .container {
//      width: 100%;
//      min-height: 100%;
//      background-size: 100%;
//      padding: 110px 0 144px;
//      position: relative;
//
//      a {
//        text-decoration: none;
//      }
//
//      .top {
//        text-align: center;
//
//        .header {
//          height: 44px;
//          line-height: 44px;
//
//          .badge {
//            position: absolute;
//            display: inline-block;
//            line-height: 1;
//            vertical-align: middle;
//            margin-left: -12px;
//            margin-top: -10px;
//            opacity: 0.8;
//          }
//
//          .logo {
//            height: 44px;
//            vertical-align: top;
//            margin-right: 16px;
//            border-style: none;
//          }
//
//          .title {
//            font-size: 33px;
//            color: rgba(0, 0, 0, .85);
//            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
//            font-weight: 600;
//            position: relative;
//            top: 2px;
//          }
//        }
//        .desc {
//          font-size: 36px;
//          color: rgba(0, 0, 0, 0.45);
//          margin-top: 12px;
//          margin-bottom: 40px;
//        }
//      }
//
//      .main {
//        min-width: 260px;
//        width: 368px;
//        margin: 0 auto;
//      }
//
//      .footer {
//        position: absolute;
//        width: 100%;
//        bottom: 0;
//        padding: 0 16px;
//        margin: 48px 0 24px;
//        text-align: center;
//
//        .links {
//          margin-bottom: 8px;
//          font-size: 14px;
//          a {
//            color: rgba(0, 0, 0, 0.45);
//            transition: all 0.3s;
//            &:not(:last-child) {
//              margin-right: 40px;
//            }
//          }
//        }
//        .copyright {
//          color: rgba(0, 0, 0, 0.45);
//          font-size: 14px;
//        }
//      }
//    }
//  }
</style>
