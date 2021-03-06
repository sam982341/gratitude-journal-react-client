import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

// MUI Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

// Redux
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/actions/dataActions';

const styles = (theme) => ({
	paper: {
		padding: 20,
		position: 'fixed',
		marginTop: 0,
		borderRadius: '0px',
		width: '20%',
		transition: '0.3s',
		//'&:hover': {
		//	background: '#f8ecfa',
		//},
		'@media (max-width: 780px)': {
			position: 'relative',
			width: '90%',
			marginTop: 0,
			padding: 20,
		},
	},
	profile: {
		'& .image-wrapper': {
			textAlign: 'center',
			position: 'relative',
		},
		'& .profile-image': {
			width: 200,
			height: 200,
			objectFit: 'cover',
			maxWidth: '100%',
			borderRadius: '50%',
			'@media (max-width: 780px)': {
				width: 100,
				height: 100,
			},
		},
		'& .profile-details': {
			textAlign: 'center',
			'& span, svg': {
				verticalAlign: 'middle',
			},
			'& a': {
				color: theme.palette.primary.main,
			},
		},
		'& hr': {
			border: 'none',
			margin: '0 0 10px 0',
		},
	},
	progressContainerProfile: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 60,
	},
});

class StaticProfile extends Component {
	render() {
		const {
			classes,
			user: {
				handle,
				createdAt,
				imageUrl,
				bio,
				website,
				location,
				dailyStreak,
			},
		} = this.props;

		const dailyStreakMarkup =
			dailyStreak === 0 ? (
				<Typography variant="body3">
					{dailyStreak} day gratitude streak 🙁
				</Typography>
			) : (
				<Typography variant="body3">
					{dailyStreak} day gratitude streak <span role="img">🔥</span>
				</Typography>
			);

		return (
			<Paper className={classes.paper}>
				<div className={classes.profile}>
					<div className="image-wrapper">
						<img src={imageUrl} alt="profile" className="profile-image" />
					</div>
					<hr />
					<div className="profile-details">
						<MuiLink
							component={Link}
							to={`/users/${handle}`}
							color="primary"
							variant="h5"
						>
							@{handle}
						</MuiLink>
						<hr />
						{dailyStreakMarkup}
						<hr />
						{bio && <Typography variant="body2">{bio}</Typography>}
						<hr />
						{location && (
							<Fragment>
								<LocationOn color="primary" /> <span>{location}</span>
								<hr />
							</Fragment>
						)}
						{website && (
							<Fragment>
								<LinkIcon color="primary" />
								<a href={website} target="_blank" rel="noopener noreferrer">
									{' '}
									{website}
								</a>
								<hr />
							</Fragment>
						)}
						<CalendarToday color="primary" />{' '}
						<span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
					</div>
				</div>
			</Paper>
		);
	}
}

StaticProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.data,
});

const mapActionsToProps = {
	getUserProfile,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(StaticProfile));
