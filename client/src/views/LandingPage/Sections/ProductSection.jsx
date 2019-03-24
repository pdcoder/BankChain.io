import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import InfoArea from "../../../components/InfoArea/InfoArea.jsx";
import Button from "../../../components/CustomButtons/Button.jsx";
import productStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
import CustomInput from "../../../components/CustomInput/CustomInput.jsx";

class ProductSection extends React.Component {


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Deposit Money to Account</h2>
            <CustomInput
              labelText="Enter Amount to Withdraw"
              id="name"
              formControlProps={{
                fullWidth: true,
                autoFocus: true
              }}
            />
            <div>
              <GridContainer>
                <Button color="primary" style={{ margin: '0 auto' }}>Send Message</Button>

              </GridContainer>
            </div>
            <h2 className={classes.title}>Deposit Money to Account</h2>
            <CustomInput
              labelText="Enter Amount to Withdraw"
              id="name"
              formControlProps={{
                fullWidth: true,
                autoFocus: true
              }}
            />


          </GridItem>
        </GridContainer>

        <div>
          <GridContainer>
            <Button color="primary" style={{ margin: '0 auto' }}>Send Message</Button>

          </GridContainer>
        </div>
        <GridContainer>
          <h2 className={classes.title}>Deposit Money to Account</h2>
          <CustomInput
            labelText="Enter Amount to Withdraw"
            id="name"
            formControlProps={{
              fullWidth: true,
              autoFocus: true
            }}
          />
        </GridContainer>
        <div>
          <GridContainer>
            <Button color="primary" style={{ margin: '0 auto' }}>Send Message</Button>

          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);
