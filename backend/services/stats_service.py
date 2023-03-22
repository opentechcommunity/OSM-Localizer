from backend.services.user_service import UserService
from backend.models.sql.enum import FeatureStatus
from backend.models.sql.features import Feature
from backend.models.dtos.stats_dto import UserStatsDTO


class StatsService:
    @staticmethod
    def get_user_challenegs_count(user_id: int):
        """Get number of hallenges the user has contributed to"""
        return (
            Feature.query.filter_by(localized_by=user_id)
            .distinct(Feature.challenge_id)
            .count()
        )

    @staticmethod
    def get_user_stats_by_status(user_id: int, action, challenge_id: int = None):
        """Get user stats by status"""
        if action.upper() == "LOCALIZED":
            query = Feature.query.filter_by(
                status=FeatureStatus.LOCALIZED.value, localized_by=user_id
            )
        elif action.upper() == "SKIPPED":
            query = Feature.query.filter(
                Feature.status.in_((
                    FeatureStatus.OTHER.value,
                    FeatureStatus.ALREADY_LOCALIZED.value,
                    FeatureStatus.TOO_HARD.value,
                    FeatureStatus.INVALID_DATA.value)
                )).filter_by(
                localized_by=user_id
                )
        else:
            raise Exception("Invalid action")
        if challenge_id:
            query = query.filter_by(challenge_id=challenge_id)
        return query.count()

    @staticmethod
    def get_user_stats(user_id: int, challenge_id: int = None):
        """Get user stats"""
        user = UserService.get_user_by_id(user_id)
        total_localized = StatsService.get_user_stats_by_status(
            user_id, "LOCALIZED", challenge_id
        )
        total_skipped = StatsService.get_user_stats_by_status(
            user_id, "SKIPPED", challenge_id
        )
        # Total challenges is the number of challenges the user has contributed to
        total_challenges = StatsService.get_user_challenegs_count(user_id)
        stats_dto = UserStatsDTO(
            username=user.username,
            total_localized=total_localized,
            total_skipped=total_skipped,
        )
        if not challenge_id:
            stats_dto.total_challenges = total_challenges

        return stats_dto
