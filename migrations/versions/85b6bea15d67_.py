"""empty message

Revision ID: 85b6bea15d67
Revises: 5adef004fb97
Create Date: 2023-02-23 19:56:14.281732

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "85b6bea15d67"
down_revision = "5adef004fb97"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "users",
        sa.Column("id", sa.BigInteger(), nullable=False),
        sa.Column("username", sa.String(), nullable=False),
        sa.Column("role", sa.Integer(), nullable=False),
        sa.Column("level", sa.Integer(), nullable=False),
        sa.Column("date_registered", sa.DateTime(), nullable=False),
        sa.Column("last_login", sa.DateTime(), nullable=False),
        sa.Column("picture_url", sa.String(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("username"),
    )
    with op.batch_alter_table("challenge", schema=None) as batch_op:
        batch_op.alter_column("country", existing_type=sa.VARCHAR(), nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("challenge", schema=None) as batch_op:
        batch_op.alter_column("country", existing_type=sa.VARCHAR(), nullable=False)

    op.drop_table("users")
    # ### end Alembic commands ###