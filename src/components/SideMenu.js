import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {IconButton} from 'material-ui';
import MenuIcon from '@material-ui/icons/Menu';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Link, useHistory} from 'react-router-dom';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import TuneIcon from '@material-ui/icons/Tune';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import "./SideMenu.css";
import {GoogleLogout} from 'react-google-login';

const useStyles = makeStyles({
    list: {
        width: 250
    },
    fullList: {
        width: 'auto'
    }
});

export default function TemporaryDrawer() {
    const classes = useStyles();
    const history = useHistory();
    // const user  = sessionStorage.getItem('user');
    const [user,
        setUser] = useState('')

    const [state,
        setState] = React.useState({top: false, left: false, bottom: false, right: false});

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user')))
      
    }, [])

    // const signOut= ()=>{
    //     const auth2 = window.gapi.auth2.getAuthInstance()
    //     if (auth2 != null) {
    //       auth2.signOut().then(
    //         auth2.disconnect()
    //         .then(()=>{console.log("logout sucessfull")})
    //         .catc((e)=>{console.log("error",e);
    //         })
    //       )
    //     }
    //     else {
    //        this.props.onLogoutFailure()
    //     }
    //   }
    const logout = (res) => {
       
        sessionStorage.clear();
        localStorage.clear();
        
        history.push("/");

    }

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({
            ...state,
            [side]: open
        });
    };

    const nav = [
        {
            id: 2,
            label: "Search",
            link: "/search",
            NavIcon: TuneIcon
        }
    ];
    const logbutton = [
        {
            id: 5,
            label: "Logout",
            NavIcon: ExitToAppIcon
        }
    ]

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}>
            <List>
                <div className="profileDiv">
                    <div className="profile img">
                        {/* {user?} */}
                        <img
                            className="profileimg"
                            src={user && user.img
                            ? user.img
                            : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDRAQDw8QEBAPEA8NE" +
                                "BAPDQ8PDxUPFREWFhYWFRUYHSghGBolGxYVITEhJikrLi4wFx8zODMtNygtLisBCgoKDg0OGxAQGi0dH" +
                                    "iAtLisrLS0rNy0tLy0tLi0rLS0tLS04LystKy0tKy0rLS8rKysrNystKy0tLS03Ky04Lf/AABEIAOEA4" +
                                    "QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQcEBQYDAgj/xABHEAACAQICBQcJBAYJBQAAA" +
                                    "AAAAQIDEQQFBhIhMUEHE1FhcYGRFBYiI1STocHSQlJysQgyYoKS4TNTY3OisrPR8CQlNDZD/8QAGgEBA" +
                                    "AMBAQEAAAAAAAAAAAAAAAECBAMFBv/EACURAQEAAgEEAgMAAwEAAAAAAAABAhEDBBMxQRIhBVFxQtHhB" +
                                    "v/aAAwDAQACEQMRAD8AvEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEgAAAAAAAACCQAAZ5V" +
                                    "68KcJTqTjCEU5SlOSjFJcW3uA9CStdIeWjKsK3Gi6mMmrr1EdWlf+8lZNdcUzicfy/Yt38nwNCn0OrUq" +
                                    "Vtl+KjqgX+D83rl2zf+qwPZzFe3+qbvK+X6eslisBFx4yw9Zp90Jrb4gXqDl9FOUDLMzerhsQlWtd0Ky" +
                                    "5ut3J7JfutnUgAABBIAEAkAQSABAJAEEgAAAAAAAAAAAAAIbA5vTTTbBZRSU8VNupO/NUKaUqs7cUuEe" +
                                    "t7D826dae4zNq0udm6eHT9VhoSapxXBy+/LrfdY1WlWfVcxxtbFVW9arNuMW7qFNbIQXUlb4s1AEtkAA" +
                                    "AAB90qjjKMotxlFqUZJtNNO6aa3MvDkq5WpucMDmk76zUKGLlv1nuhWfXsSl49JRhKYH7iQKw5DNMZ4/" +
                                    "BywldylXwUYJVHt18O7qF395Wt17Oss8AAAAAAAAAAAAAAAAAAAAAAAAAcdyuZnPC5DjKlOTjOUIUIyi" +
                                    "7SXOVIwdn02bOxK+5d//XsR/e4b/ViB+bciyetjcTTw9CGtUqOy+7FcZSfCKXE2+k2guYZe26tF1KSu+" +
                                    "foqVSlbpk7Xh+8kWJyD5NGOHxGNlH06k/Jqba/+cVGUrdsmv4C1muHicM+b45aaePgmWO34/IP05nGgW" +
                                    "V4tuVXCQjN7XOjejO/S9WyfejlsZyL4KTfNYrEUuhSjTqpfk/iTObG+Vb0+c8KMBckeRCN9uZNroWCSf" +
                                    "jzvyNpguRnL4O9WviKvSrwpx+Cv8S3ewRODP9KIse+LwVai4qrSqUnOKnFVKcoa0Hukrraus/TmTaHZb" +
                                    "g2nh8JTjJbqk06tT+Kd2jmeW3JVXy1YlL1mEmndLbzM2ozXYnqvuZWc0t0tl09mO2w/R15p5RWcYRVVY" +
                                    "qcakl+tJakHG/Ymy1Snv0bZ/wDQ42PRiYS8aSXyLhOzOAAAAAAAAAAAAAAAAAgkAAAAAAHEctNDX0exv" +
                                    "7Ko1PCvA7c5jlKjr5NjaSjrTq0KlOnFb3O11+QTJtzPJXg+ZyTCJ76kZ13+/OUl8LHWGNl2EVChSox3U" +
                                    "qcKStutGKRkmDK7u3p4TUkQSAVWAQSBBhZ5gVicJiKEt1ajVp97i0vjZ9xnAmXSLNxwH6OFGUcHj9ZWa" +
                                    "xUINftRp7V8S4DheS7L1hXmdK1nPMsRXh10ZKOp4bjujfLt5dmroABKAAAAAAAAAAAAQSBBIAAAAAAAO" +
                                    "d0pqNTorgry77o6I1Wf4B1qacFecLtLpT3opnN4r8dkylrDB8UZNxV7p2V01Z3PowvSSCCQkBBIAAhsI" +
                                    "eOUVLY5pbpKSfdG/wAjqDRaP4GSnKvNNOV9RNWdm73N6beKWYvP5rLl9AAOjkAAAAAAAAAACCQAAAAAA" +
                                    "AAAAAA1WZ07TUuEl8UYZucZS14NcVtXaaYx82Ostt/T5bx1+kEgHJ3QSQSAPbBU9apHoW19x4m0yyjaO" +
                                    "s98vyOnHj8snHmz+OLMRIBteeAAAAAAAAAAAAAAIJAAAAAAAAAAACDn8TWj5RUhucWmutOKb+LN/Umoq" +
                                    "7OUzjDSVR1o32vWdt8X/tsOXNN4u3BlrJmAwsLj4yVpei/gzMTMjftJBJjYjGRhxvLoXzINvStXUNW++" +
                                    "Ukku/adLFWOMweHnXqa8naKabfZwR2FGopLr4mvhx1GLqMt16AA7M4AAAAAAAAAAAAAAgkAAAAAAAhs1" +
                                    "GZaTYPD3U6qlJfYp+nLvtsXeTJb4RbpuDwxeLp0YOdWpCnBb5Tkox8WV9pByg1ObawtPm22kqlRqUrdU" +
                                    "bWXizgMdj62Inr16s6sumcm7di3LuLzjvtW5z0vWeIVRKUXeDSlFp7Gmrpnw0chyc5vzuHeHm/TobYdL" +
                                    "ot7PB7O9HXlLNXS0u2jzPLtS84L0eK36v8AI1yb6X4nWtGjzPL9S84L0eK+7/Iz8nH7jXxcu/qtc5Ppf" +
                                    "iZeX4F1XfdBb38kMvwLqu72QW9/JHQ04KKtFWS2JIrx8e/up5eXX1EU6ailGKslsSPWnNxd0fBz+m2b+" +
                                    "S4OSi7Va16VPpSa9KXcn8UapPTJb7dXgcfRrx1qNWFRJ2epOMrNcHbczKPzphcTUpTU6U505LdKEnGXi" +
                                    "ju9G9P8RGLjiY8/Zq001ColbjstL4F7x30pM57WgDRZdpbg69lznNyf2aq1PjufibuMk1dbU9zT2FLLP" +
                                    "K0sr6ABCQAAAAAAAAAAARckBc0uf6R0cHG0nr1WrxpRe23TJ/ZR86V54sHRvGzq1Lxpxe1dcmuhFVVq0" +
                                    "pyc5ycpSd5Sk7ts68fH8vuueeevqNrm+kmKxTalNwh/V024xt18Zd5pwDRJJ4cbdsPM5bIrrbNebmpSj" +
                                    "L9ZXMDGYeMLWbu+D2kWJj2yDMnhMVTrK9ou00uNN/rLw/JF00qkZRjKLTjJKUWtzTV0yhiyuTjN+coPD" +
                                    "Tfp0NsL73Sb+T2d6OPJj7dML6dianSLOY4WlwlVmmoQf+aXV+Zt9STUtRJySbV3ZXtsTZVGaVa069R17" +
                                    "87rOMk9lrfZXUuBfpuGcmX34jB+U6zLp+PWM+8vf6/67LRPPlWiqNSyqxvqtJJTj2dJ0hUEJuLUotxcX" +
                                    "dNOzTXFFq5RUq1MLSqVoqM5xu7fB24XW0t1XBML8sfFcvxPX5c8vHn92e/9soqHTPN/KsZJxd6VK9Kn0" +
                                    "WT9KXe/yR3unGb+TYOSi7Va96MOlJr0pLsXxaKlOPHPb1c76DMyx+lJdXzPLCUYzbTbXFJcTY0qEY7lt" +
                                    "6eJ3jlXobLKs8xOFfqqj1eNOTcqb/d4dqsa0E2b8ol0tLR3Sqji7Ql6qt9xv0Zfhfy3nRFGRbTTTs1tT" +
                                    "Wxp9RZehekDxMOaqv11NXv9+G6/auJn5OPX3HbDPf1XUAA5OgAAAAAAAAGDyxdXUpTn9yEp+CbAqnS3M" +
                                    "HiMbVlf0ab5mH4Ytp+LuzTE3b2ve9r7SDbJqaZbd0ABIGoxM25tvst0JG3MDMaNmpLjsfaVpGEZ+RZlL" +
                                    "C4qnWW6Mkppcab2SXh+SMAFVn6Iwk4SpxnBpxnFTUlxTV7lTZpiOcxNaf3qs2vw6zS+FjdaBaRf9vxFC" +
                                    "b9PC051Kd3vpO+xdktnZJHNmjocNXKvA/8AQcu5hh/aMtjIaiqYKhJ7b0oX7UrFTnR4zP8AybIowg7Vq" +
                                    "0quHhZ7VG7cpdydu1o6ddjvGf1n/AZ65sp+45PTPNvKsbNxd6VK9Kl+Fb5d7u+yxowDHJqPqLdvqnNxa" +
                                    "a3pm6TNZgKWtK73R/M2ZaK0ABZAZeU454fEU60fsSTfXF7JLwbMQEUXlCSaTW5pNdjPo1ejFZzwGGk9/" +
                                    "NRi+2Po/I2hirVAAAAABBIAAwM+nq4PEPoo1P8AKzPNTpXK2X4l/wBk147CZ5RfCoQAbWYPmpO1uuSR9" +
                                    "GLmE7KP4r+BAyj5qQUotPcz6AGknFxbT3p2IM7MaW6a7H8jBKrPbCYiVOetFtXTjKz3we9M30ZJpNbmr" +
                                    "o5s22U17xcHvjtXYaemz1fj+3h/mum+eE5Z5x8/xnmjx+KdSe9uMbqCvsXT4s2OZV9SFlvlsXZxNKW6r" +
                                    "P8AxcvwnS6l5r/IBIGXl9K8tZ7o7u0yPoWbh6WpFLjvfaegBZV8RneUl0W+KPsxMLO9Sp/zdsMsAACRa" +
                                    "2g875dR6ucj/jkb45vk/lfL49VSqv8AFf5nSGPLzWnHwAAqkAAAAADVaU4apWwNanSjrzmoqMU0r+nG+" +
                                    "1tLdc2oJl0VUvmpmHs0veUfqHmpmHs0veUfqLaB071c+3FS+amYezS95R+ow8w0QzKWrq4WTte/rKPV+" +
                                    "0XMB3aduKio6KZjqRvhZJ2SfrKP1H35qZh7NL3lH6i2gO9TtxUc9Ese008NKz2f0lH6jVy0JzO//iSfX" +
                                    "ztD6y8ALy07cUd5l5n7HP3lD6j0w+h+aQmpLBz2f2lDdx+0XaBOWy7Rnw4543G+KpXG6JZnUm35JOy2R" +
                                    "9ZQ3fxHh5l5n7HP3lD6i8QLzZW7qOPgx48Zhj4ijvMrM/ZJ+8ofUbOhohj4xS8ml1+so7/4i3gJy1btx" +
                                    "UvmpmHs0veUfqIeiuYezS95R+otsDvU7cUtgdD8yjNuWEkrpr+ko77/AIjP81Mw9ml7yj9RbQHdp24qX" +
                                    "zUzD2aXvKP1DzUzD2aXvKP1FtAd6nbjntCMBWw+ElTrwcJc7OSTcX6LjHbsb43OhAOdu7teTQACEgAAg" +
                                    "kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
                                    "//Z"}/>
                    </div>
                    <div className="profileName">
                        <h4 className="name"> Hello {user && user.name
                                ? user.name
                                : ""}</h4>
                    </div>
                </div>
                {}

            </List>
            <Divider/>
            <List>
                {/* {nav.map(({ id, label, link, NavIcon }) => (
          <ListItem button key={id} >
            <ListItemIcon> <NavIcon /> </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))} */}
                {nav.map(({id, label, link, NavIcon}) => (
                    <ListItem button key={id}>

                        <ListItemIcon>
                            <NavIcon/>
                        </ListItemIcon>
                        <Link
                            className="App-Link"
                            style={{
                            display: " inline-flex"
                        }}
                            to={link}>
                            <ListItemText primary={label}/>
                        </Link>

                    </ListItem>
                ))}

            </List>
            <Divider/>

            <List>

                {logbutton.map(({id, label, NavIcon}) => (
                    <ListItem button key={id} onClick={() => logout()}>
                        <ListItemIcon>
                            <NavIcon/>
                        </ListItemIcon>
                        <GoogleLogout
      clientId="679149407314-8us7dpd4acq7a72l3rssndc2nmj87337.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
    >
    </GoogleLogout>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <MuiThemeProvider>
                <IconButton
                    color="primary"
                    aria-label="open drawer"
                    onClick={toggleDrawer('left', true)}
                    edge="start">
                    <MenuIcon
                        color="primary"
                        style={{
                        fontSize: "15px"
                    }}/>
                </IconButton>
            </MuiThemeProvider>
            {/* <Button onClick={toggleDrawer('left', true)}>Open Left</Button> */}
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}
